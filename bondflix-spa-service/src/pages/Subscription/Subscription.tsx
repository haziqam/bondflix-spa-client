import { SubscriptionTable } from "./Subscription.components";

export function Subscription() {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
                <h1>My Subscribers</h1>
                <SubscriptionTable />
            </div>
        </div>
    );
}
