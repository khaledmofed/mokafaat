/**
 * لوحة المستخدم (App / الموبايل)
 * الصفحات التي تتطلب أو تعرض بيانات المستخدم: البروفايل، المفضلة، السلة، الطلبات، المحفظة
 */

import ProfilePage from "../profile/ProfilePage";
import SavedPage from "../saved/SavedPage";
import CartPage from "../cart/CartPage";
import OrdersPage from "../orders/OrdersPage";
import OrderDetailPage from "../orders/OrderDetailPage";
import OrderSuccessRedirectPage from "../orders/OrderSuccessRedirectPage";
import OrderFailureRedirectPage from "../orders/OrderFailureRedirectPage";
import OrderPaymentCallbackPage from "../orders/OrderPaymentCallbackPage";
import WalletPage from "../wallet/WalletPage";

export {
  ProfilePage,
  SavedPage,
  CartPage,
  OrdersPage,
  OrderDetailPage,
  OrderSuccessRedirectPage,
  OrderFailureRedirectPage,
  OrderPaymentCallbackPage,
  WalletPage,
};
