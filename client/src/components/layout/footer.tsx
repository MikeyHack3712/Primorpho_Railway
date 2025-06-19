import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="text-2xl font-bold mb-4">Primorpho</div>
            <p className="text-muted-foreground mb-4">
              Custom websites built for impact. No templates, just results.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/services">LaunchPad</Link></li>
              <li><Link href="/services">Pro Presence</Link></li>
              <li><Link href="/services">Smart Business</Link></li>
              <li><Link href="/tools">Website Audit</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/portfolio">Portfolio</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Get Started</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/contact">Free Consultation</Link></li>
              <li><Link href="/reserve-slot">Reserve Slot</Link></li>
              <li><Link href="/tools">Free Audit</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Primorpho. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}