import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PageNotFound from './pages/PageNotFound';
import TabContent from './components/TabContent';
import LazyLoadComponent from './components/LazyLoadComponent';
import TabList from './components/TabList';

function App() {
  const [tabs, setTabs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchTabs() {
    try {
      setIsLoading(true);
      const res = await fetch('./tabs.json');
      const data = await res.json();
      setTabs([...data.tabs].sort((a, b) => a.order - b.order));
    } catch (err) {
      console.error('There was en error loading data...');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTabs();
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? <p>Loading...</p> : <TabList tabs={tabs} />}
      <Routes>
        <Route
          index
          element={
            <TabContent
              content={<LazyLoadComponent path="tabs/DummyList.js" />}
            />
          }
        />
        {tabs.map((tab, i) => (
          <Route
            path={`/${tab.id}`}
            element={
              <TabContent content={<LazyLoadComponent path={tab.path} />} />
            }
            key={tab.id}
          />
        ))}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
