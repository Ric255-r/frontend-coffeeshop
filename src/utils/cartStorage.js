const CART_KEY = 'cart';
const TOTAL_KEY = 'totalHarga';
const USER_KEY = 'currentUser';
const ACTIVE_OWNER_KEY = 'activeCartOwner';

function readCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY)) || null;
  } catch (error) {
    return null;
  }
}

function getOwnerKey() {
  const user = readCurrentUser();
  if (!user) {
    return 'guest';
  }

  return user.id_user || user.pelanggan_id || user.email || 'guest';
}

function storageKey(name) {
  return `coffeeku:${getOwnerKey()}:${name}`;
}

export function getCart() {
  return JSON.parse(localStorage.getItem(storageKey(CART_KEY))) || [];
}

export function setCart(value) {
  localStorage.setItem(storageKey(CART_KEY), JSON.stringify(value));
  localStorage.setItem(ACTIVE_OWNER_KEY, getOwnerKey());
}

export function getTotalHarga() {
  return JSON.parse(localStorage.getItem(storageKey(TOTAL_KEY))) || [];
}

export function setTotalHarga(value) {
  localStorage.setItem(storageKey(TOTAL_KEY), JSON.stringify(value));
  localStorage.setItem(ACTIVE_OWNER_KEY, getOwnerKey());
}

export function hasCart() {
  return localStorage.getItem(storageKey(CART_KEY)) !== null;
}

export function ensureCart(defaultValue) {
  if (!hasCart()) {
    setCart(defaultValue);
  }
}

export function clearCurrentCart() {
  localStorage.removeItem(storageKey(CART_KEY));
  localStorage.removeItem(storageKey(TOTAL_KEY));
  localStorage.removeItem(CART_KEY);
  localStorage.removeItem(TOTAL_KEY);
  localStorage.removeItem(ACTIVE_OWNER_KEY);
}

export function clearLegacyCart() {
  localStorage.removeItem(CART_KEY);
  localStorage.removeItem(TOTAL_KEY);
}

export function clearLogoutCartView() {
  localStorage.removeItem(CART_KEY);
  localStorage.removeItem(TOTAL_KEY);
  localStorage.removeItem(ACTIVE_OWNER_KEY);
}
