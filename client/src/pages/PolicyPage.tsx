import { useParams, Link } from "react-router";
import { Container } from "@/components/ui/container";
import { ChevronRight } from "lucide-react";

const policies: Record<string, { title: string; icon: string; sections: { heading: string; content: string[] }[] }> = {
  "doi-tra": {
    title: "Chính sách đổi trả",
    icon: "🔄",
    sections: [
      { heading: "Điều kiện đổi trả", content: ["Sản phẩm còn nguyên tem, hộp, phụ kiện đi kèm", "Sản phẩm chưa qua sử dụng hoặc lỗi do nhà sản xuất", "Thời gian đổi trả trong vòng 30 ngày kể từ ngày mua", "Kèm theo hóa đơn mua hàng"] },
      { heading: "Quy trình đổi trả", content: ["Bước 1: Liên hệ hotline 1900 1234 hoặc email support@techshop.vn", "Bước 2: Gửi hình ảnh sản phẩm lỗi (nếu có)", "Bước 3: Nhân viên xác nhận và hướng dẫn gửi hàng", "Bước 4: Nhận sản phẩm thay thế hoặc hoàn tiền trong 3-5 ngày"] },
      { heading: "Trường hợp không áp dụng", content: ["Sản phẩm đã qua sử dụng, có dấu hiệu tác động vật lý", "Sản phẩm không còn đầy đủ phụ kiện, hộp", "Sản phẩm hết thời gian đổi trả", "Sản phẩm thuộc danh mục không hỗ trợ đổi trả"] },
    ],
  },
  "bao-hanh": {
    title: "Chính sách bảo hành",
    icon: "🛡️",
    sections: [
      { heading: "Thời gian bảo hành", content: ["Laptop: 24 tháng bảo hành chính hãng", "Điện thoại: 12 tháng bảo hành chính hãng", "Tai nghe, phụ kiện: 6-12 tháng tùy sản phẩm", "Bàn phím cơ: 12-24 tháng"] },
      { heading: "Phạm vi bảo hành", content: ["Lỗi kỹ thuật do nhà sản xuất", "Lỗi phần cứng trong điều kiện sử dụng bình thường", "Không bao gồm hư hỏng do tác động vật lý, nước", "Không bao gồm pin và phụ kiện tiêu hao"] },
      { heading: "Cách thức bảo hành", content: ["Mang trực tiếp đến cửa hàng TechShop", "Gửi qua đường bưu điện (miễn phí chiều gửi đi)", "Thời gian xử lý: 7-14 ngày làm việc"] },
    ],
  },
  "van-chuyen": {
    title: "Chính sách vận chuyển",
    icon: "🚚",
    sections: [
      { heading: "Phí vận chuyển", content: ["Miễn phí vận chuyển cho đơn hàng từ 2.000.000₫", "Đơn hàng dưới 2.000.000₫: phí 30.000₫", "Giao hàng nhanh (2h): phụ thu 50.000₫ (chỉ HCM, HN)"] },
      { heading: "Thời gian giao hàng", content: ["Nội thành TP.HCM, Hà Nội: 1-2 ngày", "Các tỉnh thành khác: 3-5 ngày", "Giao nhanh 2h: chỉ áp dụng nội thành HCM, HN (8h-20h)"] },
      { heading: "Đơn vị vận chuyển", content: ["GHN - Giao Hàng Nhanh", "GHTK - Giao Hàng Tiết Kiệm", "J&T Express", "Grab Express (giao nhanh 2h)"] },
    ],
  },
};

export default function PolicyPage() {
  const { type } = useParams();
  const policy = policies[type || "doi-tra"];

  if (!policy) {
    return (
      <Container className="py-16 text-center">
        <h1 className="text-2xl font-bold">Trang không tồn tại</h1>
      </Container>
    );
  }

  return (
    <Container className="py-8 max-w-3xl mx-auto">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Trang chủ</Link>
        <ChevronRight className="size-3" />
        <span className="text-foreground">{policy.title}</span>
      </nav>

      <div className="text-center mb-10">
        <span className="text-5xl block mb-4">{policy.icon}</span>
        <h1 className="text-3xl font-extrabold">{policy.title}</h1>
      </div>

      <div className="space-y-8">
        {policy.sections.map((section, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold mb-4">{section.heading}</h2>
            <ul className="space-y-2.5">
              {section.content.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="shrink-0 size-1.5 rounded-full bg-primary mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Nav to other policies */}
      <div className="mt-10 grid sm:grid-cols-3 gap-3">
        {Object.entries(policies).map(([key, p]) => (
          <Link
            key={key}
            to={`/policy/${key}`}
            className={`rounded-xl border p-4 text-center transition-all hover:shadow-md ${key === type ? "border-primary bg-primary/5" : "border-border bg-card"
              }`}
          >
            <span className="text-2xl block mb-1">{p.icon}</span>
            <span className="text-sm font-medium">{p.title}</span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
