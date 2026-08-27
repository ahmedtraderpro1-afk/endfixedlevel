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

function generateClientUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Standard UUID v4 fallback
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Creates an order record and associated line items in Supabase.
 * Uses client-generated UUIDs and blind inserts without .select() because anonymous users have INSERT permission only under RLS.
 */
export async function createOrder(
  customerData: CustomerOrderData,
  items: CartItem[]
): Promise<CreateOrderResult> {
  const orderReference = customerData.orderReference;

  if (!isSupabaseConfigured() || !supabase) {
    if (import.meta.env.DEV) {
      console.log('[DIAGNOSTIC] SUPABASE_CONFIGURED: false');
    }
    return {
      success: false,
      orderReference,
      error: 'Database unconfigured (offline/local fallback mode)',
    };
  }

  if (import.meta.env.DEV) {
    console.log('[DIAGNOSTIC] SUPABASE_CONFIGURED: true');
  }

  try {
    // 1. Generate order UUID client-side
    const orderId = generateClientUUID();

    // 2. Insert primary Order record (NO .select() / .single() to respect RLS write-only policy)
    const { error: orderError } = await supabase
      .from('orders')
      .insert({
        id: orderId,
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
      });

    if (orderError) {
      if (import.meta.env.DEV) {
        console.warn('[DIAGNOSTIC] ORDER_INSERT_FAILED:', orderError.message);
      }
      return {
        success: false,
        orderReference,
        error: 'Order record could not be saved to database.',
      };
    }

    if (import.meta.env.DEV) {
      console.log('[DIAGNOSTIC] ORDER_INSERT_SUCCESS');
    }

    // 3. Insert Order Items snapshots using the same client-generated order UUID
    if (items && items.length > 0) {
      const orderItemsRows = items.map((item) => ({
        id: generateClientUUID(),
        order_id: orderId,
        product_id: item.id || null,
        product_title: item.title,
        product_image: item.image || null,
        unit_price: item.price,
        quantity: item.quantity,
        line_total: Number((item.price * item.quantity).toFixed(2)),
      }));

      // Blind insert without .select()
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsRows);

      if (itemsError) {
        if (import.meta.env.DEV) {
          console.warn('[DIAGNOSTIC] ORDER_ITEMS_INSERT_FAILED:', itemsError.message);
        }
        return {
          success: true,
          orderId,
          orderReference,
          error: 'Order created, but items snapshot failed.',
        };
      }

      if (import.meta.env.DEV) {
        console.log('[DIAGNOSTIC] ORDER_ITEMS_INSERT_SUCCESS');
      }
    }

    return {
      success: true,
      orderId,
      orderReference,
    };
  } catch (err: any) {
    if (import.meta.env.DEV) {
      console.warn('[DIAGNOSTIC] ORDER_INSERT_FAILED: unexpected error');
    }
    return {
      success: false,
      orderReference,
      error: 'An unexpected database error occurred.',
    };
  }
}

