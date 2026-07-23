import { useState, useEffect } from "react"
import { Link as ScrollLink } from "react-scroll"
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom"
import { MenuData } from "@/data/navbarData"
import { Button } from "@/components/ui/Button/Button" 
import "./Navbar.css"
import logo from "@/assets/icons/espiral.svg"

const Navbar = ({ solid = false }) => {
  const [sticky, setSticky] = useState(false)
  const [clicked, setClicked] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isHomePage = location.pathname === "/"
  const isSolid = solid || sticky

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = () => setClicked(false)
  const toggleMenu = () => setClicked(!clicked)

  const goToSection = (sectionId) => {
    handleClick()
    navigate("/", { state: { scrollTo: sectionId } })
  }

  return (
    <nav className={`navbar ${isSolid ? "sticky" : ""}`}>
      <div className="navbar-container container">
        <RouterLink to="/" className="navbar-logo" onClick={handleClick}>
          <img src={logo} alt="logo" className="logo-icon" />
          <span className="logo-text">Gestión <span className="danger">360</span></span>
        </RouterLink>

        <ul className={clicked ? "nav-menu active" : "nav-menu"}>
          {MenuData.map((item, index) => (
            <li key={index}>
              {isHomePage ? (
                <ScrollLink
                  to={item.to}
                  smooth={true}
                  duration={600}
                  offset={-80}
                  className={item.cName}
                  onClick={handleClick}
                >
                  {item.title}
                </ScrollLink>
              ) : (
                <span
                  className={item.cName}
                  onClick={() => goToSection(item.to)}
                  style={{ cursor: "pointer" }}
                >
                  {item.title}
                </span>
              )}
            </li>
          ))}

          <li className="nav-action">
            <Button
              variant="primary"
              shape="pill"
              size="md"
              as={RouterLink}
              to="/login"
              onClick={handleClick}
            >
              Ingresar
            </Button>
          </li>
        </ul>

        <div className="nav-icon" onClick={toggleMenu}>
          <span>{clicked ? "✕" : "☰"}</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar