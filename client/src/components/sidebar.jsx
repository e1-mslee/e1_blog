import React from 'react';

const SidebarComponent = () => {
    return (
        <div id="sidebar">
            <div className='inner'>
                <nav id='menu'>
                    <header className='major'>
                        <h2>Category</h2>
                    </header>
                    <ul>
                        <li><a href="#">Main Page</a></li>
                        <li>
                            <span className='opener'>Cloud</span>
                            <ul>
                                <li><a href="#">GCP</a></li>
                                <li><a href="#">GCP</a></li>
                            </ul>
                        </li>
                        <li>
                            <span className='opener'>ABC</span>
                            <ul>
                                <li><a href="#">AAAA</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
				<footer id="footer">
					<p className="copyright">&copy; enterprise1 BS Team</p>
				</footer>
            </div>
        </div>
    )
}

export default SidebarComponent;