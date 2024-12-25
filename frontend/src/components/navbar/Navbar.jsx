import NavbarButton from "./NavbarButton"; 

const Navbar = () => {
  const navbarOptions = [
    { name: 'Home', link: '/' },
    { name: 'Movies', link: '/movies' },
    { name: 'Music', link: '/music' },
    { name: 'Lists', link: '/lists' },
  ];

  return (
    <div className="w-full bg-two">
      <div className="h-10 max-w-[900px] mx-auto flex flex-row justify-between items-center">

        {/* Logo and Page name */}
        <div>FunWishLists</div>

        {/* Navbar options */}
        <div className="flex flex-row gap-4">
          {navbarOptions.map((option) => ( 
            <NavbarButton key={option.name} name={option.name} link={option.link} /> 
          ))}
        </div>

        {/* Account */}
        <div>
          Profile
        </div>
      </div>
    </div>
  );
};

export default Navbar;