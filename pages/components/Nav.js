import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";



const Navitems = ({ href, title, active }) => {
  const router = useRouter();
  return (
    <Link href={href} className={` nav_link ${active? 'active':"" }`}>
      {title}
    </Link>
  );
};


function Nav() {
    const [navActive, setNavActive] = useState(null);

  return (
    <>
      <nav>
        <div className="nav_section">
          <div>
            <div
              className="nav_menu-bar "
              onClick={() => setNavActive(!navActive)}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="creatorname" style={{ color: "#90EE90" }}>
            <Link href="/">Michias Shiferaw</Link>
          </div>

          <div className={`${navActive ? "active" : ""} nav_menu-list  `}>
            <div
              onClick={() => {
                setActiveIdx("");
                setNavActive(false);
              }}
            >
              <Navitems title={"Home"} href={"/"} />
            </div>
            <div>
              <Navitems title={"Blog"} href={"/"} />
            </div>
            <div>
              <Navitems title={"About"} href={"/"} />
            </div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="end">
            <div className="githubLogo">Github Logo</div>
          </div>
        </div>
      </nav>
    </>
  );
}




export default Nav;
