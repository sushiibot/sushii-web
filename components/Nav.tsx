export default function Nav() {
    return (
        <header className="bg-shadow fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
            <nav className="f6 fw6 ttu tracked">
                <a className="link dim white dib mr3" href="/" title="Home">
                    home
                </a>
                <a
                    className="link dim white dib mr3"
                    href="/about"
                    title="About"
                >
                    about
                </a>
                <a
                    className="link dim white dib mr3"
                    href="/commands"
                    title="Commands"
                >
                    commands
                </a>
                <a className="link dim white dib" href="/help" title="Help">
                    help
                </a>
            </nav>
        </header>
    );
}
