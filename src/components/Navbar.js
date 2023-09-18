import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container flex justify-between items-center">
        <h1 className="text-2xl text-white font-semibold">My App</h1>

        <ul className="flex space-x-4 items-center">
          {session ? (
            <li className="relative group">
              <button
                className="p-1 focus:outline-none"
                onClick={toggleDropdown}
              >
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="w-10 h-10 rounded-full"
                />
              </button>
              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 p-2 bg-white rounded shadow-lg"
                  onClick={closeDropdown}
                >
                  <p>{session.user.name}</p>

                  <hr className="my-2" />
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => signOut("google")}
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
