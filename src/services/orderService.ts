import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { CartItem } from '../context/CartContext';

export interface CustomerOrderData {
  orderReference: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  address1: string;
  address2?: string;
  city: string;
  region?: string;
  postalCode: string;
  notes?: string;
  subtotal: number;
  shipping?: number;
  total: number;
  currency?: string;
}

export interface CreateOrderResult {
  success: boolean;
  orderId?: string;
  orderReference: string;
  error?: string;
}

/**
 * Creates an order record and associated line items in Supabase.
 * If Supabase is unconfigured or returns an error, returns a failure result gracefully without crashing.
 */
export async function createOrder(
  customerData: CustomerOrderData,
  items: CartItem[]
): Promise<CreateOrderResult> {
  const orderReference = customerData.orderReference;

  if (!isSupabaseConfigured() || !supabase) {
    return {
      success: false,
      orderReference,
      error: 'Database unconfigured (offline/local fallback mode)',
    };
  }

  try {
    // 1. Insert primary Order record
    const { data: orderRow, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_reference: orderReference,
        first_name: customerData.firstName.trim(),
        last_name: customerData.lastName.trim(),
        email: customerData.email.trim().toLowerCase(),
        phone: customerData.phone.trim(),
        country: customerData.country.trim(),
        address_line_1: customerData.address1.trim(),
        address_line_2: customerData.address2?.trim() || null,
        city: customerData.city.trim(),
        region: customerData.region?.trim() || null,
        postal_code: customerData.postalCode.trim(),
        notes: customerData.notes?.trim() || null,
        subtotal: customerData.subtotal,
        shipping: customerData.shipping ?? 0,
        total: customerData.total,
        currency: customerData.currency || 'USD',
        status: 'WhatsApp Pending',
        source: 'website',
      })
      .select('id')
      .single();

    if (orderError || !orderRow) {
      console.warn('Supabase order creation returned error:', orderError?.message || 'No order row returned');
      return {
        success: false,
        orderReference,
        error: 'Order record could not be saved to database.',
      };
    }

    const orderId = orderRow.id;

    // 2. Insert Order Items snapshots
    if (items && items.length > 0) {
      const orderItemsRows = items.map((item) => ({
        order_id: orderId,
        product_id: item.id || null,
        product_title: item.title,
        product_image: item.image || null,
        unit_price: item.price,
        quantity: item.quantity,
        line_total: Number((item.price * item.quantity).toFixed(2)),
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsRows);

      if (itemsError) {
        console.warn('Supabase order_items creation returned error:', itemsError?.message);
        // Order row was still saved
        return {
          success: true,
          orderId,
          orderReference,
          error: 'Order created, but items snapshot failed.',
        };
      }
    }

    return {
      success: true,
      orderId,
      orderReference,
    };
  } catch (err: any) {
    console.warn('Unexpected error during database order creation:', err?.message || err);
    return {
      success: false,
      orderReference,
      error: 'An unexpected database error occurred.',
    };
  }
}
