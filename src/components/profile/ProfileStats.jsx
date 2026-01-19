import React from 'react'
import MonthlyHeapMap from './profStats/MonthlyHeapMap'
import useJournalStore from '../../store/JournalStore'
const calculateTotalWordsInJournals = (journals)=>{
  return journals.reduce((acc, entry)=>{
    let numberOfWhiteSapce = 0;
    for(const char of entry.content){
      if(char === " "){
        numberOfWhiteSapce++;
      }
    }
    return acc + numberOfWhiteSapce+1;
  },0)
}
const calculateSreaks = ()=>{

}
const ProfileStats = () => {
  const journals = useJournalStore(state=>state.journals);
  // console.log(journals);
  const totalWords = calculateTotalWordsInJournals(journals);
  // console.log(totalWords);
  const streaks = calculateSreaks(journals);
  return (
    <section className='pp-stats'>
      {/* 1. Heatmap Section */}
      <MonthlyHeapMap/>

      {/* 2. Stats Cards */}
      <div className='stats-grid'>
        {/* <div className='stat-card'>
          <span className="stat-icon">🔥</span>
          <h4>18</h4>
          <p>Day Streak</p>
        </div> */}
        <div className='stat-card'>
          <span className="stat-icon">📖</span>
          <h4>{journals.length}</h4>
          <p>Journals</p>
        </div>
        <div className='stat-card'>
          <span className="stat-icon">✍️</span>
          <h4>{totalWords}</h4>
          <p>Total Words</p>
        </div>
      </div>
    </section>
  )
}

export default ProfileStats
