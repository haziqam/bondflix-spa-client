import { Card } from "primereact/card";
import { TabMenu } from "primereact/tabmenu";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import contentThumbnail from "../../assets/thumbnail1.jpg";
import channelProfilePic from "../../temp-video/profile.png";
import { Button } from "primereact/button";
import { searchContent } from "../../services/content.service";
import { searchChannel } from "../../services/user.service";

export function ResultsContent(props: {query: string}) {
    const [tabActiveIndex, setTabActiveIndex] = useState(0);
    const [foundContents, setFoundContents] = useState<Content[]>([])
    const [foundChannels, setFoundChannels] = useState<User[]>([])
    

    useEffect(()=> {
        searchContent(props.query).then((response) => {
            // console.log(response.data)
            setFoundContents(response.data as Content[])
        })
        searchChannel(props.query).then((response) => {
            console.log(response.data)
            setFoundChannels(response.data as User[])
        })
    }, [])

    return (
        <div style={{ marginBottom: "32px" }}>
            <ResultsMenuTab
                tabActiveIndex={tabActiveIndex}
                setTabActiveIndex={setTabActiveIndex}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
                {tabActiveIndex === 0 ? (
                    <ContentSearchResults foundContents={foundContents} />
                ) : (
                    <ChannelSearchResults foundChannels={foundChannels}/>
                )}
            </div>
        </div>
    );
}

function ResultsMenuTab(props: {
    tabActiveIndex: number;
    setTabActiveIndex: Dispatch<SetStateAction<number>>;
}) {
    const { tabActiveIndex, setTabActiveIndex } = props;
    const tabItems = [
        { label: "Content", icon: "pi pi-fw pi-video" },
        { label: "Channel", icon: "pi pi-fw pi-user" },
    ];

    return (
        <TabMenu
            model={tabItems}
            activeIndex={tabActiveIndex}
            onTabChange={(e) => setTabActiveIndex(e.index)}
        />
    );
}

function ContentSearchResults(props: {foundContents: Content[]}) {
    return (
        <div
            style={{
                width: "80%",
                marginTop: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
            }}
        > {
            props.foundContents.length === 0 ? <h2>No content found</h2> : props.foundContents.map((content) => (
                <ContentResultsCard content={content} key={content.id}/>
            ))
        }
        </div>
    );
}

function ContentResultsCard(props: {content: Content}) {
    const {content} = props
    return (
        <Card
            pt={{
                content: {
                    style: {
                        padding: "0",
                    },
                },
            }}
            style={{ backgroundColor: "#ececec", height: "250px" }}
        >
            <div style={{ display: "flex", gap: "20px" }}>
                <img
                    src={`http://localhost:3000/static/thumbnails?id=${content.id}`}
                    alt="Content Thumbnail"
                    style={{
                        objectFit: "cover",
                        borderRadius: "10px",
                        width: "360px",
                        height: "210px",
                    }}
                />
                <section>
                    <h2 style={{ margin: "0" }}>{content.title}</h2>
                    <div>{content.uploaded_at}</div>
                    <div
                        style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                            margin: "16px auto 16px auto",
                        }}
                    >
                        <img
                            src={`http://localhost:3000/static/pictures?id=${content.creator_id}`}
                            alt="Channel profile picture"
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                            }}
                        />
                        {/* <div>{content.user.name}</div> */}
                        <div>channel name</div>
                    </div>
                    <p
                        style={{
                            margin: "0",
                            display: "-webkit-box",
                            WebkitLineClamp: "4",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                    >
                        {content.description}
                    </p>
                </section>
            </div>
        </Card>
    );
}

function ChannelSearchResults(props: {foundChannels: User[]}) {
    return (
        <div
            style={{
                width: "60%",
                marginTop: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
            }}
        >   {
            props.foundChannels.length === 0 ? <h2>No Channels Found</h2> :
            props.foundChannels.map((channel) => (
                <ChannelResultsCard channel={channel} key={channel.id}/>
            ))
        }
        </div>
    );
}

function ChannelResultsCard(props: {channel: User}) {
    return (
        <Card
            pt={{
                content: {
                    style: {
                        padding: "0",
                    },
                },
            }}
            style={{ backgroundColor: "#ececec" }}
        >
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <img
                    src={channelProfilePic}
                    alt="Channel profile picture"
                    style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                    }}
                />
                <section>
                    <h2 style={{ margin: "0" }}>{props.channel.name}</h2>
                    <div style={{ color: "#a8a8a8" }}>{`@${props.channel.username}`}</div>
                </section>
                <Button
                    style={{
                        marginLeft: "200px",
                    }}
                >
                    Subscribe
                </Button>
            </div>
        </Card>
    );
}
