import React from 'react';
import AssessmentForm from './AssessmentForm';

function InpatientAssessment() {
  const formContent = (
    <div>
      <div style={{ 
        border: '1px solid #ccc',
        padding: '20px',
        backgroundColor: '#fff'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>DOCTOR'S INITIAL ASSESSMENT</div>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
            <div>
              History Source: □Patient □Other(Name):_____________ Relationship:_____________
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>PRESENTING COMPLAINTS:</div>
          <div style={{ height: '80px', border: '1px solid #ccc' }}></div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>HISTORY OF PRESENT ILLNESS:</div>
          <div style={{ height: '80px', border: '1px solid #ccc' }}></div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>CO - MORBIDITIES:</div>
          <div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>Diabetes</td>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>No □ Yes □ If Yes, Duration:_______</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>CAD</td>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>No □ Yes □ If Yes, Duration:_______</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>Hypertension</td>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>No □ Yes □ If Yes, Duration:_______</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>Asthma / COPD</td>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>No □ Yes □ If Yes, Duration:_______</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>Old CVA</td>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>No □ Yes □ If Yes, Duration:_______</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>Thyroid</td>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>No □ Yes □ If Yes, Duration:_______</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>Tuberculosis</td>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>No □ Yes □ If Yes, Duration:_______</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>CKD</td>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>No □ Yes □ If Yes, Duration:_______</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>Seizures</td>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>No □ Yes □ If Yes, Duration:_______</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '10px' }}>
            If any other specify:_________________________________________________
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AssessmentForm 
      title="Inpatient Assessment Record" 
      formContent={formContent}
    />
  );
}

export default InpatientAssessment;
