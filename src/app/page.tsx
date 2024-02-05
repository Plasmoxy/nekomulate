import Calendar from './components/Calendar';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div className="container mx-auto pt-10">
                <Calendar />
            </div>
        </main>
    );
}
