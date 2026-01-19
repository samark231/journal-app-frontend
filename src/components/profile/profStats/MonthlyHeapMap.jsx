import React, { useState, useMemo, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "../../../styles/profile/heatmap.css"; 
import useGeneralStore from '../../../store/generalStore';

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const intensity = ["none","low","mid","high","max"];

const MonthlyHeatmap = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const heatMapData = useGeneralStore(state=>state.heatMapData);
  const getHeatMapData = useGeneralStore(state=>state.getHeatMapData);

   useEffect(()=>{
    getHeatMapData();
  },[selectedYear])

  // 1. DYNAMICALLY Generate the array for the heatmap
  const daysArray = useMemo(() => {
    const totalDays = getDaysInMonth(selectedYear, selectedMonth);
    
    // Create an array of size 'totalDays' (e.g., 31)
    return Array.from({ length: totalDays }, (_, i) => {
      const day = i + 1;
      // Format: "2026-01-05" (zero-padded)
      const dateKey = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const entry = heatMapData[dateKey]?heatMapData[dateKey]:0; // Check if we have data
      
      return {
        day,
        dateKey,
        hasEntry: !!entry,
        intensity: entry<5?intensity[entry]:"max"
      };
    });
  }, [selectedYear, selectedMonth, heatMapData]);

  // console.log(daysArray);

  return (
    <div className="heatmap-container">
      {/* --- 1. Year Selector --- */}
      <div className="heatmap-header">
        <button onClick={() => setSelectedYear(y => y - 1)}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span className="year-display">{selectedYear}</span>
        <button onClick={() => setSelectedYear(y => y + 1)}>
            <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      {/* --- 2. Month Tabs --- */}
      <div className="month-tabs">
        {months.map((data, index) => (
          <button 
            key={data} 
            className={`month-tab ${selectedMonth === index ? 'active' : ''}`}
            onClick={() => setSelectedMonth(index)}
          >
            {data}
          </button>
        ))}
      </div>

      {/* --- 3. The Heatmap Grid --- */}
      <div className="heatmap-grid">
        {daysArray.map((data) => (
          <div 
            key={data.day} 
            className={`heatmap-box intensity-${data.intensity}`}
            title={`${data.dateKey}: ${data.hasEntry ? 'Entry exists' : 'No entry'}`}
          >
            <span className="day-number">{data.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper for date calculation
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};
export default MonthlyHeatmap;