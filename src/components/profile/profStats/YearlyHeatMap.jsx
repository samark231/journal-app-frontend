import React from 'react';
import { format, subDays, eachDayOfInterval, isSameDay } from 'date-fns';
import '../../styles/profile/yearlyHeatMap.css';

const YearlyHeatMap = ({ data = [] }) => {
  // 1. Generate the last 365 days
  const today = new Date();
  const startDate = subDays(today, 364); // 365 days total including today
  
  const dates = eachDayOfInterval({
    start: startDate,
    end: today
  });

  // 2. Helper to find activity level for a specific day
  const getActivityLevel = (date) => {
    const dayData = data.find(d => isSameDay(new Date(d.date), date));
    
    if (!dayData) return 0;
    if (dayData.count >= 10) return 4; // High activity
    if (dayData.count >= 5) return 3;
    if (dayData.count >= 3) return 2;
    if (dayData.count >= 1) return 1;
    return 0;
  };

  return (
    <div className="heatmap-container">
      <div className="heatmap-months">
        {/* Simplified labels - you can expand this logic later */}
        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span>
        <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
        <span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
      </div>
      
      <div className="heatmap-grid">
        {dates.map((date) => {
          const level = getActivityLevel(date);
          const dateStr = format(date, 'yyyy-MM-dd');
          
          return (
            <div 
              key={dateStr}
              className={`heatmap-box level-${level}`}
              title={`${dateStr}: ${level === 0 ? 'No' : 'Some'} activity`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default YearlyHeatMap;