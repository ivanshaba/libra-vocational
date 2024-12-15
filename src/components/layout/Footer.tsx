import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container grid grid-cols-1 gap-8 py-12 md:grid-cols-4">
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold">Arena Sports</h3>
          <p className="text-sm text-muted-foreground">
            Empowering athletes to reach their full potential through expert coaching and world-class facilities.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/programs" className="text-muted-foreground hover:text-foreground">
                Programs
              </Link>
            </li>
            <li>
              <Link to="/registration" className="text-muted-foreground hover:text-foreground">
                Registration
              </Link>
            </li>
            <li>
              <Link to="/facilities" className="text-muted-foreground hover:text-foreground">
                Facilities
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>123 Sports Avenue</li>
            <li>City, State 12345</li>
            <li>Phone: (123) 456-7890</li>
            <li>Email: info@arenasportsacademyug.org</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Facebook
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Twitter
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 Arena Sports Academy. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
