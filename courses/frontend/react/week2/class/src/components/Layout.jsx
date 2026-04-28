import './Layout.css';

export default function Layout({ header, children, footer }) {
    return (
        <div className="layout">
            <header>{header} header content here</header>
            {children}
            <footer>{footer} footer content here</footer>
        </div>
    );
}
 
function MainContent({ children }) {
    return <main className="main-content">{children || "Main content here"}</main>;

}
export { MainContent };