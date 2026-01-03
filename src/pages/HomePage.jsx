import React, { useEffect } from 'react';
import JournalCard from '../components/JournalCard';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import useJournalStore from '../store/JournalStore.js';
import AddJournal from '../components/AddJournal.jsx';
import "../styles/homePage.css";

function HomePage() {
    const filteredJournals = useJournalStore(state => state.filteredJournals);
    const getAllJournals = useJournalStore(state => state.getAllJournals);
    
    useEffect(() => {
        // console.log("mounting homepage,calling getalljournals...");
        getAllJournals();
    }, []);

    return (
        <div className='homePage-container'>
            <Header />
            
            <div className='homePage-main'>
                {/* Left Side: The Editor */}
                <section className='homepage-section section-editor'>
                    <AddJournal />
                </section>

                {/* Right Side: The List */}
                <section className='homepage-section section-list'>
                    <div className='list-header'>
                        <h3>Recent Entries</h3>
                        <span className='entry-count'>{filteredJournals.length} entries</span>
                    </div>
                    
                    <div className='journal-grid'>
                        {filteredJournals.length > 0 ? (
                            filteredJournals.map((entry) => (
                                <JournalCard 
                                    key={entry.id} 
                                    entry={entry}
                                />
                            ))
                        ) : (
                            <div className="empty-state">No journals yet. Start writing!</div>
                        )}
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
}

export default HomePage;