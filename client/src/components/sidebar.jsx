import React, { useState } from 'react';

const OpenerComponent = ({ label, subItems }) => {
    const [isActive, setIsActive] = useState(false);
  
    const toggleOpener = () => {
      setIsActive(!isActive);
    };
  
    return (
      <li>
        <span className={`opener ${isActive ? 'active' : ''}`} onClick={toggleOpener}>{label}</span>
        <ul style={{ display: isActive ? 'block' : 'none' }}>
          {subItems.map((item, index) => (
            <li key={index}><a href="#">{item}</a></li>
          ))}
        </ul>
      </li>
    );
  };
  
  const SidebarComponent = () => {
    const openerData = [
      { label: 'Cloud', subItems: ['GCP', 'ABC'] },
      { label: 'XYZ', subItems: ['DEF', 'GHI'] },
    ];
  
    return (
      <div id="sidebar">
        <div className='inner'>
          <nav id='menu'>
            <header className='major'>
              <h2>Category</h2>
            </header>
            <ul>
              <li><a href="#">Main Page</a></li>
              {openerData.map((data, index) => (
                <OpenerComponent key={index} label={data.label} subItems={data.subItems} />
              ))}
            </ul>
          </nav>
          <footer id="footer">
            <p className="copyright">&copy; enterprise1 BS Team</p>
          </footer>
        </div>
      </div>
    );
  };
  
  export default SidebarComponent;
  
