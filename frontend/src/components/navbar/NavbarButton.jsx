import { Link } from "react-router"

const NavbarButton = ({name, link, id}) => {
  return (
    <div className="px-2 py-1 bg-red-200 hover:bg-red-300 text-black">
      <Link to={link} key={id}>
        {name}
      </Link>
    </div>
  )
}

export default NavbarButton