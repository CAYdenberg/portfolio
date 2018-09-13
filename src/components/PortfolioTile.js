import {h} from 'preact'
import cloudinary from 'cloudinary'

// clone of handlebar method
const cloudinaryUrl = (image) => {
  if ((image) && (image.public_id)) {
    var imageName = image.public_id.concat('.', image.format);
    return cloudinary.url(imageName, {secure: true});
  } else {
    return null;
  }
}

export default props => {
  const {project} = props
  const {image, brief, title, slug} = project
  return (
    <div className="homepage-tile">
      <a className="homepage-tile__item homepage-project" href={`/portfolio/${slug}`}>
        <div className="homepage-project__bg">
          <img src={cloudinaryUrl(image)} alt={brief} />
        </div>
        <div className="homepage-project__fg">
          <h2 className="homepage-project__title">{title}</h2>
          <p className="homepage-project__brief">{brief}</p>
        </div>
      </a>
    </div>
  )
}
