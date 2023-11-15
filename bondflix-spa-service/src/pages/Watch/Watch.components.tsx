import channelProfilePic from "../../temp-video/profile.png";
import { Button } from "primereact/button";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Divider } from "primereact/divider";

export function VideoContainer(props: { contentId: number}) {
    return (
        <div
            style={{
                marginTop: "10px",
                marginBottom: "10px",
            }}
        >
            <video
                controls
                src={`http://localhost:3000/static/contents?id=${props.contentId}`}
                style={{
                    height: "360px",
                    width: "640px",
                    borderRadius: "20px",
                }}
            ></video>
        </div>
    );
}

export function VideoInformationContainer(props: {
    title: string;
    channelName: string;
    channelUsername: string;
    uploadedAt: string;
    genres: Genre[];
    categories: Category[];
    description: string;
}) {
    const {
        title,
        channelName,
        channelUsername,
        uploadedAt,
        genres,
        categories,
        description,
    } = props;

    return (
        <div
            style={{
                width: "640px",
                position: "relative",
            }}
        >
            <h2
                style={{
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                }}
            >
                {title}
            </h2>
            <ChannelInfoBox
                channelName={channelName}
                channelUsername={channelUsername}
            />
            <DescriptionBox
                uploadedAt={uploadedAt}
                genres={genres}
                categories={categories}
                description={description}
            />
        </div>
    );
}

function ChannelInfoBox(props: {
    channelName: string;
    channelUsername: string;
}) {
    const { channelName, channelUsername } = props;
    return (
        <div
            style={{
                display: "flex",
                marginBottom: "16px",
                justifyContent: "space-between",
            }}
        >
            <div style={{ display: "flex" }}>
                <img
                    src={channelProfilePic}
                    alt="Channel profile picture"
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginRight: "20px",
                    }}
                />
                <div
                    style={{
                        marginRight: "80px",
                    }}
                >
                    <div
                        style={{
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                        }}
                    >
                        {channelName}
                    </div>
                    <div
                        style={{
                            fontSize: "0.8rem",
                        }}
                    >
                        {`@${channelUsername}`}
                    </div>
                </div>
            </div>

            <div>
                <Button>Subscribe</Button>
            </div>
        </div>
    );
}

function DescriptionBox(props: {
    uploadedAt: string;
    genres: Genre[];
    categories: Category[];
    description: string;
}) {
    const { uploadedAt, genres, categories, description } = props;
    const sectionHeaderStyle = { fontSize: "1rem", fontWeight: "bold" };
    return (
        <Accordion style={{ marginBottom: "30px" }}>
            <AccordionTab header="Description">
                <section>
                    <h3 style={sectionHeaderStyle}>Uplaoded at {uploadedAt}</h3>
                </section>
                <Divider />
                <section>
                    <h3 style={sectionHeaderStyle}>Genre</h3>
                    <ContentInfoLabelWrapper infos={genres} />
                </section>
                <Divider />
                <section>
                    <h3 style={sectionHeaderStyle}>Category</h3>
                    <ContentInfoLabelWrapper infos={categories} />
                </section>
                <Divider />
                <section>{description}</section>
            </AccordionTab>
        </Accordion>
    );
}

function ContentInfoLabelWrapper(props: { infos: Genre[] | Category[] }) {
    return (
        <div
            style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
            }}
        >
            {props.infos.map((el) => (
                <ContentInfoLabel info={el.name} />
            ))}
        </div>
    );
}

function ContentInfoLabel(props: { info: string }) {
    return (
        <span
            style={{
                backgroundColor: "lightgray",
                padding: "8px",
                borderRadius: "2px",
                textTransform: "capitalize",
            }}
        >
            {props.info}
        </span>
    );
}
