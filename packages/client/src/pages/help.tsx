import Head from "next/head";

export default function Help() {
    return (
        <div className="flex-grow">
            <Head>
                <title>Help | sushii 2</title>
            </Head>
            <section className="max-w-screen-lg mx-auto px-3 pt-6">
                <h1 className="text-4xl my-4">Help</h1>
                <h2 className="text-2xl">Initial Set Up</h2>
                <p className="max-w-screen-sm">
                    Initial set up is mostly setting log channels, and the mute
                    role. An example set of commands that would be run to set up
                    a server would be as follows.
                    <br />
                    An interactive setup command will be coming soon™️.
                </p>
                <p className="my-4 font-mono">
                    settings modlog set #mod-log
                    <br />
                    settings msglog set #msg-log
                    <br />
                    settings memberlog set #member-log
                    <br />
                    settings msgchannel set #general
                    <br />
                    settings joinmsg set Welcome &lt;mention&gt; to
                    &lt;server&gt;!
                    <br />
                    settings mute role mute
                </p>
                <p className="max-w-screen-sm">
                    The main feature of sushii is that you can ban or mute users
                    with the built in tools in Discord (right click a member and
                    ban, or manually add a mute role to a member), then set the
                    reason afterwards. This allows for more flexibility, ease of
                    use, and faster moderation responses. sushii watches for
                    when members are banned and when a member's roles are
                    updated, so you are not required to only use the ban and
                    mute commands.
                </p>
                <h3 className="text-2xl mt-5">Still need help?</h3>
                <p className="max-w-screen-sm">
                    Support is offered on the sushii{" "}
                    <a
                        href="https://discord.gg/QCXjyrs"
                        className="text-blue-400"
                    >
                        Discord server
                    </a>
                    .
                </p>
            </section>
        </div>
    );
}
