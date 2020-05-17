import React from "react"
import { Link } from "gatsby"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    header = (
      <header>
        {
        (location.pathname === rootPath) 
          ? <h1 className="site-title">
            <Link to={'/'}>
              {title}
            </Link>
          </h1>
          : 
          <Link to={'/'}>
            <h1 className="site-title">{title}</h1>
          </Link>
        }
        <p className="page-title">me(at)futurepastori.com</p>
      </header>
    )
    
    return (
      <div>
        {header}
        <main>{children}</main>
        <footer>
          {new Date().getFullYear()}. Find me everywhere - @futurepastori
        </footer>
      </div>
    )
  }
}

export default Layout
