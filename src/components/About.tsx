export const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">About Our Platform</h2>
          <p className="text-lg text-gray-600 mb-12">
            We're transforming public sector procurement in Africa through innovative technology.
            Our AI-powered platform ensures transparency, fairness, and efficiency in connectivity
            projects for schools and health centers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-primary/5 rounded-lg">
              <div className="text-4xl font-bold text-primary mb-2">$2B+</div>
              <div className="text-gray-600">Annual Savings</div>
            </div>
            <div className="p-6 bg-primary/5 rounded-lg">
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="p-6 bg-primary/5 rounded-lg">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};