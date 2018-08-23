import {h} from 'preact'
import PortfolioTile from './PortfolioTile'

export default props => {
  return (
    <div className="homepage-main" >
      <div className="homepage-row">
        <PortfolioTile project={props.projects[0]} />
        <PortfolioTile project={props.projects[1]} />
      </div>

      <nav className="homepage-nav">
        <a className="homepage-nav__link" href="/blog">Blog</a>
        <a className="homepage-nav__link" href="/contact">Contact</a>
        <a className="homepage-nav__link" href="/curriculum-vitae">CV</a>
      </nav>

      <div className="homepage-row">
        <PortfolioTile project={props.projects[2]} />
        <PortfolioTile project={props.projects[3]} />
      </div>
    </div>
  )
}
