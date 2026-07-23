import "./Banner.css"


const Banner = ({title, subtitle, image }) => {
  return (
    <section
      className="banner"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="banner-overlay"></div>

      <div className="banner-header">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  )
}

export default Banner