import type { Product, Category, Order, User, Review, CouponCode } from "@/types";

export const categories: Category[] = [
  { id: 1, name: "Laptop", slug: "laptop", icon: "💻", description: "Laptop gaming, văn phòng, đồ họa chính hãng", productCount: 45, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400" },
  { id: 2, name: "Điện thoại", slug: "dien-thoai", icon: "📱", description: "Smartphone chính hãng giá tốt", productCount: 120, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400" },
  { id: 3, name: "Tai nghe", slug: "tai-nghe", icon: "🎧", description: "Tai nghe gaming, bluetooth, chống ồn", productCount: 80, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
  { id: 4, name: "Bàn phím", slug: "ban-phim", icon: "⌨️", description: "Bàn phím cơ, gaming, văn phòng", productCount: 65, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400" },
  { id: 5, name: "Chuột", slug: "chuot", icon: "🖱️", description: "Chuột gaming, ergonomic, wireless", productCount: 55, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400" },
  { id: 6, name: "Màn hình", slug: "man-hinh", icon: "🖥️", description: "Màn hình gaming, đồ họa, văn phòng", productCount: 35, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400" },
  { id: 7, name: "Phụ kiện", slug: "phu-kien", icon: "🔌", description: "Phụ kiện máy tính, điện thoại", productCount: 200, image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e7?w=400" },
  { id: 8, name: "Loa", slug: "loa", icon: "🔊", description: "Loa bluetooth, soundbar, loa gaming", productCount: 40, image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400" },
];

export const products: Product[] = [
  {
    id: 1, name: "MacBook Pro 16\" M3 Pro", slug: "macbook-pro-16-m3-pro",
    price: 62990000, originalPrice: 69990000,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600",
    ],
    category: "Laptop", categorySlug: "laptop", brand: "Apple", rating: 4.9, reviewCount: 234,
    description: "MacBook Pro 16 inch chip M3 Pro, 18GB RAM, 512GB SSD. Hiệu năng vượt trội cho công việc chuyên nghiệp, thiết kế đồ họa và lập trình.",
    specs: { "CPU": "Apple M3 Pro", "RAM": "18GB", "SSD": "512GB", "Màn hình": "16.2\" Liquid Retina XDR", "Pin": "22 giờ" },
    variants: [
      { id: 1, name: "512GB", type: "storage", value: "512GB", priceModifier: 0, stock: 15 },
      { id: 2, name: "1TB", type: "storage", value: "1TB", priceModifier: 5000000, stock: 8 },
    ],
    stock: 23, isFeatured: true, tags: ["laptop", "apple", "macbook", "đồ họa"],
  },
  {
    id: 2, name: "iPhone 15 Pro Max 256GB", slug: "iphone-15-pro-max-256gb",
    price: 29990000, originalPrice: 34990000,
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600",
    ],
    category: "Điện thoại", categorySlug: "dien-thoai", brand: "Apple", rating: 4.8, reviewCount: 567,
    description: "iPhone 15 Pro Max với chip A17 Pro, camera 48MP, khung titan. Điện thoại flagship cao cấp nhất của Apple.",
    specs: { "CPU": "A17 Pro", "RAM": "8GB", "Bộ nhớ": "256GB", "Màn hình": "6.7\" Super Retina XDR", "Pin": "4422 mAh" },
    variants: [
      { id: 3, name: "Titan tự nhiên", type: "color", value: "#C0B9A8", priceModifier: 0, stock: 20 },
      { id: 4, name: "Titan xanh", type: "color", value: "#3B4252", priceModifier: 0, stock: 12 },
      { id: 5, name: "Titan trắng", type: "color", value: "#F5F5F0", priceModifier: 0, stock: 18 },
    ],
    stock: 50, isFeatured: true, isFlashSale: true, flashSaleEnd: "2026-03-02T23:59:59", tags: ["điện thoại", "apple", "iphone", "flagship"],
  },
  {
    id: 3, name: "Sony WH-1000XM5", slug: "sony-wh-1000xm5",
    price: 7490000, originalPrice: 8990000,
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600",
    ],
    category: "Tai nghe", categorySlug: "tai-nghe", brand: "Sony", rating: 4.7, reviewCount: 342,
    description: "Tai nghe chống ồn cao cấp Sony WH-1000XM5 với công nghệ LDAC, chống ồn chủ động hàng đầu thế giới.",
    specs: { "Driver": "30mm", "Chống ồn": "ANC hàng đầu", "Pin": "30 giờ", "Kết nối": "Bluetooth 5.2, LDAC", "Trọng lượng": "250g" },
    variants: [
      { id: 6, name: "Đen", type: "color", value: "#1a1a1a", priceModifier: 0, stock: 30 },
      { id: 7, name: "Bạc", type: "color", value: "#C0C0C0", priceModifier: 0, stock: 25 },
    ],
    stock: 55, isFeatured: true, isFlashSale: true, flashSaleEnd: "2026-03-02T23:59:59", tags: ["tai nghe", "sony", "chống ồn", "bluetooth"],
  },
  {
    id: 4, name: "Razer BlackWidow V4 Pro", slug: "razer-blackwidow-v4-pro",
    price: 5690000, originalPrice: 6490000,
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=600",
    ],
    category: "Bàn phím", categorySlug: "ban-phim", brand: "Razer", rating: 4.6, reviewCount: 189,
    description: "Bàn phím cơ gaming cao cấp Razer BlackWidow V4 Pro với switch Razer Green, RGB Chroma, và Command Dial.",
    specs: { "Switch": "Razer Green", "Layout": "Full-size", "Kết nối": "USB-C, Wireless", "Pin": "N/A (có dây)", "Backlight": "Razer Chroma RGB" },
    variants: [
      { id: 8, name: "Green Switch", type: "size", value: "Green", priceModifier: 0, stock: 20 },
      { id: 9, name: "Yellow Switch", type: "size", value: "Yellow", priceModifier: 200000, stock: 15 },
    ],
    stock: 35, isFeatured: true, tags: ["bàn phím", "razer", "gaming", "cơ"],
  },
  {
    id: 5, name: "Logitech G Pro X Superlight 2", slug: "logitech-g-pro-x-superlight-2",
    price: 3290000, originalPrice: 3690000,
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600",
    ],
    category: "Chuột", categorySlug: "chuot", brand: "Logitech", rating: 4.8, reviewCount: 456,
    description: "Chuột gaming không dây siêu nhẹ Logitech G Pro X Superlight 2 chỉ 60g, sensor HERO 2 25K.",
    specs: { "Sensor": "HERO 2 25K", "DPI": "32,000", "Trọng lượng": "60g", "Pin": "95 giờ", "Kết nối": "LIGHTSPEED Wireless" },
    variants: [
      { id: 10, name: "Đen", type: "color", value: "#1a1a1a", priceModifier: 0, stock: 40 },
      { id: 11, name: "Trắng", type: "color", value: "#FFFFFF", priceModifier: 0, stock: 30 },
      { id: 12, name: "Hồng", type: "color", value: "#FF69B4", priceModifier: 100000, stock: 15 },
    ],
    stock: 85, isFeatured: true, isFlashSale: true, flashSaleEnd: "2026-03-02T23:59:59", tags: ["chuột", "logitech", "gaming", "wireless"],
  },
  {
    id: 6, name: "Samsung Galaxy S24 Ultra", slug: "samsung-galaxy-s24-ultra",
    price: 27990000, originalPrice: 33990000,
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600",
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600",
    ],
    category: "Điện thoại", categorySlug: "dien-thoai", brand: "Samsung", rating: 4.7, reviewCount: 389,
    description: "Samsung Galaxy S24 Ultra với S-Pen, camera 200MP, chip Snapdragon 8 Gen 3 for Galaxy. AI Galaxy tích hợp.",
    specs: { "CPU": "Snapdragon 8 Gen 3", "RAM": "12GB", "Bộ nhớ": "256GB", "Màn hình": "6.8\" Dynamic AMOLED 2X", "Pin": "5000 mAh" },
    variants: [
      { id: 13, name: "Titan Gray", type: "color", value: "#8B8B8B", priceModifier: 0, stock: 25 },
      { id: 14, name: "Titan Violet", type: "color", value: "#9B8BB0", priceModifier: 0, stock: 18 },
    ],
    stock: 43, isFeatured: true, tags: ["điện thoại", "samsung", "galaxy", "flagship"],
  },
  {
    id: 7, name: "Dell UltraSharp U2723QE 27\"", slug: "dell-ultrasharp-u2723qe",
    price: 12990000, originalPrice: 14990000,
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600",
      "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=600",
    ],
    category: "Màn hình", categorySlug: "man-hinh", brand: "Dell", rating: 4.8, reviewCount: 178,
    description: "Màn hình 4K IPS Black 27 inch Dell UltraSharp, độ phủ màu 98% DCI-P3, USB-C 90W, KVM tích hợp.",
    specs: { "Panel": "IPS Black", "Độ phân giải": "3840x2160 (4K)", "Tần số": "60Hz", "Cổng": "USB-C 90W, HDMI, DP", "Kích thước": "27 inch" },
    variants: [],
    stock: 18, tags: ["màn hình", "dell", "4k", "đồ họa"],
  },
  {
    id: 8, name: "AirPods Pro 2 USB-C", slug: "airpods-pro-2-usb-c",
    price: 5690000, originalPrice: 6790000,
    images: [
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=600",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600",
    ],
    category: "Tai nghe", categorySlug: "tai-nghe", brand: "Apple", rating: 4.8, reviewCount: 892,
    description: "AirPods Pro 2 với USB-C, chip H2, chống ồn chủ động gấp 2 lần, âm thanh không gian thích ứng.",
    specs: { "Chip": "Apple H2", "Chống ồn": "ANC 2x", "Pin": "6 giờ (case 30 giờ)", "Kết nối": "Bluetooth 5.3", "Sạc": "USB-C, MagSafe, Qi" },
    variants: [],
    stock: 100, isFlashSale: true, flashSaleEnd: "2026-03-02T23:59:59", tags: ["tai nghe", "apple", "airpods", "true wireless"],
  },
  {
    id: 9, name: "ASUS ROG Strix G16 2024", slug: "asus-rog-strix-g16-2024",
    price: 35990000, originalPrice: 39990000,
    images: [
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600",
    ],
    category: "Laptop", categorySlug: "laptop", brand: "ASUS", rating: 4.6, reviewCount: 156,
    description: "Laptop gaming ASUS ROG Strix G16, Intel Core i9-14900HX, RTX 4070, 16GB DDR5, 1TB SSD NVMe.",
    specs: { "CPU": "Intel Core i9-14900HX", "GPU": "NVIDIA RTX 4070 8GB", "RAM": "16GB DDR5", "SSD": "1TB NVMe Gen 4", "Màn hình": "16\" QHD+ 240Hz" },
    variants: [
      { id: 15, name: "16GB RAM", type: "size", value: "16GB", priceModifier: 0, stock: 10 },
      { id: 16, name: "32GB RAM", type: "size", value: "32GB", priceModifier: 3000000, stock: 5 },
    ],
    stock: 15, tags: ["laptop", "asus", "rog", "gaming"],
  },
  {
    id: 10, name: "JBL Charge 5", slug: "jbl-charge-5",
    price: 3290000, originalPrice: 3990000,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600",
    ],
    category: "Loa", categorySlug: "loa", brand: "JBL", rating: 4.5, reviewCount: 267,
    description: "Loa bluetooth JBL Charge 5 chống nước IP67, pin 20 giờ, công suất 40W, có thể sạc ngược cho thiết bị khác.",
    specs: { "Công suất": "40W", "Pin": "20 giờ", "Chống nước": "IP67", "Kết nối": "Bluetooth 5.1", "Trọng lượng": "960g" },
    variants: [
      { id: 17, name: "Đen", type: "color", value: "#1a1a1a", priceModifier: 0, stock: 35 },
      { id: 18, name: "Xanh", type: "color", value: "#2196F3", priceModifier: 0, stock: 20 },
      { id: 19, name: "Đỏ", type: "color", value: "#F44336", priceModifier: 0, stock: 15 },
    ],
    stock: 70, tags: ["loa", "jbl", "bluetooth", "chống nước"],
  },
  {
    id: 11, name: "Keychron Q1 Pro", slug: "keychron-q1-pro",
    price: 4590000,
    images: [
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=600",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600",
    ],
    category: "Bàn phím", categorySlug: "ban-phim", brand: "Keychron", rating: 4.7, reviewCount: 213,
    description: "Bàn phím cơ custom Keychron Q1 Pro, wireless QMK/VIA, gasket mount, hot-swap PBT keycaps.",
    specs: { "Switch": "Gateron Jupiter Brown", "Layout": "75%", "Kết nối": "Bluetooth, USB-C", "Mount": "Gasket", "Keycap": "Double-shot PBT" },
    variants: [
      { id: 20, name: "Carbon Black", type: "color", value: "#2d2d2d", priceModifier: 0, stock: 22 },
      { id: 21, name: "Shell White", type: "color", value: "#F0EDE8", priceModifier: 0, stock: 18 },
    ],
    stock: 40, tags: ["bàn phím", "keychron", "cơ", "custom"],
  },
  {
    id: 12, name: "Sạc nhanh Anker 65W GaN", slug: "sac-nhanh-anker-65w-gan",
    price: 890000, originalPrice: 1190000,
    images: [
      "https://images.unsplash.com/photo-1625723044792-44de16ccb4e7?w=600",
    ],
    category: "Phụ kiện", categorySlug: "phu-kien", brand: "Anker", rating: 4.6, reviewCount: 534,
    description: "Sạc nhanh Anker 65W GaN II, 3 cổng (2 USB-C + 1 USB-A), sạc nhanh PD, nhỏ gọn.",
    specs: { "Công suất": "65W", "Cổng": "2 USB-C + 1 USB-A", "Công nghệ": "GaN II", "Sạc nhanh": "PD 3.0, QC 3.0", "Kích thước": "Siêu nhỏ gọn" },
    variants: [],
    stock: 200, tags: ["phụ kiện", "anker", "sạc nhanh", "gan"],
  },
];

export const reviews: Review[] = [
  { id: 1, userId: 1, userName: "Nguyễn Văn An", avatar: "https://i.pravatar.cc/40?img=1", rating: 5, comment: "Sản phẩm tuyệt vời, đóng gói cẩn thận. Ship nhanh lắm!", createdAt: "2026-02-28" },
  { id: 2, userId: 2, userName: "Trần Thị Bình", avatar: "https://i.pravatar.cc/40?img=5", rating: 4, comment: "Chất lượng tốt, pin trâu. Hơi nặng một chút nhưng chấp nhận được.", createdAt: "2026-02-25" },
  { id: 3, userId: 3, userName: "Lê Hoàng Cường", avatar: "https://i.pravatar.cc/40?img=3", rating: 5, comment: "Dùng rất ổn, performance cực kỳ mượt. Khuyên mọi người nên mua!", createdAt: "2026-02-20" },
  { id: 4, userId: 4, userName: "Phạm Minh Đức", avatar: "https://i.pravatar.cc/40?img=4", rating: 4, comment: "Giao hàng nhanh, sản phẩm chính hãng. Giá cả hợp lý so với thị trường.", createdAt: "2026-02-18" },
  { id: 5, userId: 5, userName: "Hoàng Thị Em", avatar: "https://i.pravatar.cc/40?img=9", rating: 5, comment: "Mua tặng bạn trai, rất hài lòng. Sẽ quay lại mua tiếp!", createdAt: "2026-02-15" },
];

export const mockUser: User = {
  id: 1, name: "Nguyễn Văn An", email: "an.nguyen@gmail.com", phone: "0901234567",
  avatar: "https://i.pravatar.cc/100?img=1",
  addresses: [
    { id: 1, name: "Nguyễn Văn An", phone: "0901234567", street: "123 Nguyễn Huệ", ward: "Phường Bến Nghé", district: "Quận 1", city: "TP. Hồ Chí Minh", isDefault: true },
    { id: 2, name: "Nguyễn Văn An", phone: "0901234567", street: "456 Lý Thường Kiệt", ward: "Phường 14", district: "Quận 10", city: "TP. Hồ Chí Minh", isDefault: false },
  ],
};

export const mockOrders: Order[] = [
  {
    id: "ORD-20260228-001", items: [],
    total: 68680000, subtotal: 70680000, shipping: 0, discount: 2000000,
    status: "delivered", createdAt: "2026-02-28",
    address: mockUser.addresses[0], paymentMethod: "Thanh toán khi nhận hàng (COD)",
  },
  {
    id: "ORD-20260225-002", items: [],
    total: 7490000, subtotal: 7490000, shipping: 0, discount: 0,
    status: "shipping", createdAt: "2026-02-25",
    address: mockUser.addresses[0], paymentMethod: "Chuyển khoản ngân hàng",
  },
  {
    id: "ORD-20260220-003", items: [],
    total: 33280000, subtotal: 33280000, shipping: 0, discount: 0,
    status: "confirmed", createdAt: "2026-02-20",
    address: mockUser.addresses[1], paymentMethod: "Ví MoMo",
  },
];

export const coupons: CouponCode[] = [
  { code: "WELCOME10", discount: 10, type: "percent", minOrder: 500000, maxDiscount: 200000 },
  { code: "SALE50K", discount: 50000, type: "fixed", minOrder: 300000 },
  { code: "FREESHIP", discount: 30000, type: "fixed", minOrder: 0 },
];
