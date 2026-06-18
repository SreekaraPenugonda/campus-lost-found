// components/RecoveryTips.jsx
export default function RecoveryTips({ item }) {
  const getTips = (category, location) => {
    const tips = {
      'ID_CARDS': [
        'Check with the Security Office - most IDs are turned in there',
        'Visit the Student Services desk',
        'Check your department office',
        'Notify your professors - they may have found it'
      ],
      'ELECTRONICS': [
        'Check with the IT Help Desk',
        'Look in the library - many laptops are left there',
        'Check the lost and found at the nearest cafeteria',
        'Enable tracking features if available'
      ],
      'BAGS': [
        'Check the nearest security checkpoint',
        'Look in the last classroom/meeting room you were in',
        'Check with campus transport services',
        'Ask the reception at any building you visited'
      ],
      'BOOKS': [
        'Check with the Library circulation desk',
        'Look in the classroom or study area',
        'Check with your department office',
        'Ask your classmates'
      ],
      'KEYS': [
        'Check with Security Office - keys are often turned in',
        'Look at the nearest information desk',
        'Retrace your steps - keys often fall near exits',
        'Check with campus maintenance'
      ],
      'CLOTHING': [
        'Check the nearest lost and found bin',
        'Look in the locker room or gym',
        'Check with the Sports Office',
        'Ask at the reception of the building'
      ],
      'OTHER': [
        'Retrace your steps and check common areas',
        'Ask at the nearest reception desk',
        'Check with Security Office',
        'Ask friends or colleagues if they saw it'
      ]
    };

    return tips[category] || tips['OTHER'];
  };

  const tips = getTips(item?.category, item?.building);

  return (
    <div className="recovery-tips">
      <h3>💡 What to Do Next</h3>
      <ul>
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
      <p className="recovery-reminder">
        ⏰ Don't wait too long - the sooner you act, the better!
      </p>

      <style>{`
        .recovery-tips {
          background: #f0fdf4;
          border-radius: 8px;
          padding: 20px;
          border: 1px solid #86efac;
        }

        .recovery-tips h3 {
          font-size: 16px;
          color: #166534;
          margin: 0 0 12px 0;
        }

        .recovery-tips ul {
          margin: 0;
          padding-left: 20px;
          color: #14532d;
          line-height: 1.8;
        }

        .recovery-reminder {
          margin: 12px 0 0 0;
          font-size: 14px;
          color: #166534;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}