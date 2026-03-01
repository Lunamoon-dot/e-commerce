import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <Container className="py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold mb-3">Liên hệ với chúng tôi</h1>
        <p className="text-muted-foreground">Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ qua bất kỳ kênh nào bên dưới.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact form */}
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="text-xl font-bold mb-6">Gửi tin nhắn</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input id="contact-name" label="Họ tên" placeholder="Nguyễn Văn An" required />
              <Input id="contact-email" label="Email" type="email" placeholder="email@example.com" required />
            </div>
            <Input id="contact-phone" label="Số điện thoại" placeholder="0901234567" />
            <Input id="contact-subject" label="Tiêu đề" placeholder="Hỏi về sản phẩm..." required />
            <Textarea id="contact-message" label="Nội dung" placeholder="Nội dung tin nhắn..." rows={5} required />
            <Button type="submit" size="lg">Gửi tin nhắn</Button>
          </form>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="rounded-2xl overflow-hidden shadow-lg h-64 bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.443!2d106.70!3d10.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ2JzEyLjAiTiAxMDbCsDQyJzAwLjAiRQ!5e0!3m2!1svi!2svn!4v1"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Map"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: MapPin, title: "Địa chỉ", info: "123 Nguyễn Huệ, P. Bến Nghé, Q.1, TP.HCM" },
              { icon: Phone, title: "Hotline", info: "1900 1234 (8h-22h)" },
              { icon: Mail, title: "Email", info: "support@techshop.vn" },
              { icon: Clock, title: "Giờ làm việc", info: "T2-CN: 8:00 - 22:00" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <div className="shrink-0 rounded-lg bg-primary/10 p-2.5">
                  <item.icon className="size-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.info}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
