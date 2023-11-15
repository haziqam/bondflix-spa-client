
import "./AdminDashboard.styles.css";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../services/auth.service";
import { useAuthorize } from "../../hooks/useAuthorize";
import { useToast } from "../../hooks/useToast";
import { Card } from "primereact/card";
import thumbnail1 from "../../assets/thumbnail1.jpg";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import {
    SubscriptionsIcon,
    UploadIcon,
    MyChannelIcon,
    LogoutIcon,
    HamburgerButtonIcon,
} from "../../shared-components/Icons";
import { BondflixLogo } from "../../shared-components/Logo";
import { flushSync } from "react-dom";

export function AdminDashboardContent() {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px 20px",
                padding: "10px 15px 15px 15px",
            }}
        >
            <ContentCard
                title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque error molestiae placeat accusantium tenetur sunt at aliquam fugit consequuntur. Exercitationem non beatae voluptatum est placeat distinctio, corporis ut quia quae."
                channelName="Mr Beast"
                thumbnailSrc={thumbnail1}
                id={10}
            />
        </div>
    );
}

function ContentCard(props: {
    title: string;
    channelName: string;
    thumbnailSrc: string;
    id: number;
}) {
    const { title, channelName, thumbnailSrc, id } = props;
    const navigate = useNavigate();
    const ContentHeader = (
        <img
            src={thumbnailSrc}
            alt="Video Thumbnail"
            style={{
                objectFit: "cover",
                borderTopLeftRadius: "6px",
                borderTopRightRadius: "6px",
            }}
        />
    );

    const ContentFooter = () => {
        return (
            <div>
                <div
                    style={{
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    <h2 style={{ margin: "0", fontSize: "1rem" }}>{title}</h2>
                </div>

                <div
                    style={{
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        fontSize: "0.75rem",
                        paddingTop: "5px",
                        color: "#9b9b9b",
                    }}
                >
                    {channelName}
                </div>
            </div>
        );
    };

    const handleClick = () => {
        const uri = `/watch?id=${id}`;
        navigate(encodeURI(uri));
    };

    return (
        <Card
            header={ContentHeader}
            footer={ContentFooter}
            pt={{
                footer: {
                    style: {
                        paddingTop: "0",
                    },
                },
                body: {
                    style: {
                        padding: "0.5rem",
                    },
                },
            }}
            className="ContentCard"
            onClick={handleClick}
        ></Card>
    );
}