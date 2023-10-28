import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useState } from 'react';

export function LoginForm() {
    const [username, setusername] = useState("")

    const footer = (
        <>
            <Button label="Login" icon="pi pi-check" />
            <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
        </>
    );
    return (
        <Card title="Login" footer={footer}>
            <form>
                <InputText value={username} onChange={(e) => setusername(e.target.value)} />
            </form>
        </Card>
    )
}