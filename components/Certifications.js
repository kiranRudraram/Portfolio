// components/Certifications.js
const certs = [
    'ISC2 Certified in Cybersecurity (CC)',
    'EC-Council CEHv12',
    'CompTIA Security+',
    'Advanced Penetration Testing (Infosec Train)',
  ];
  
  export default function Certifications() {
    return (
      <section id="certifications" className="py-16 px-4 bg-gray-900">
        <h2 className="text-3xl font-bold mb-6">Certifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {certs.map(cert => (
            <div key={cert} className="p-4 bg-gray-800 rounded text-center">
              {cert}
            </div>
          ))}
        </div>
      </section>
    );
  }
  