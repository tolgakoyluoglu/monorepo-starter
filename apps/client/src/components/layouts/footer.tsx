import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdEmail, MdAutoAwesome } from 'react-icons/md'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <MdAutoAwesome className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Fullstack</h3>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">Fullstack</p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@nordicfreelancers.com"
                className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <MdEmail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Fullstack</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/login"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact us</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@nordicfreelancers.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  hello@test.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} @ All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
