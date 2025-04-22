// components/Projects.js
const projects = [
    {
      name: 'CyberSneak (E‑commerce)',
      description: 'Built a secure sneaker store with Stripe, MFA, and OWASP Top 10 protections.',
      link: '#',
    },
    {
      name: 'Ransomware Simulation',
      description: 'Automated phishing/ransomware tests in Python, improving awareness by 50%.',
      link: '#',
    },
    {
      name: 'Smart Contracts',
      description: 'Deployed and tested Solidity contracts locally via Foundry & Ganache.',
      link: '#',
    },
  ];
  
  export default function Projects() {
    return (
      <section id="projects" className="py-16 px-4">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map(p => (
            <div key={p.name} className="p-6 bg-gray-800 rounded">
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="mt-2">{p.description}</p>
              {p.link && (
                <a
                  href={p.link}
                  className="mt-4 inline-block text-[#1E90FF] hover:underline"
                >
                  View
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }
  