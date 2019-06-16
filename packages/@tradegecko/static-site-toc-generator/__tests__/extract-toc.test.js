const extractToc = require('../extract-toc');
let mixed = `
<h1 id="ourdesignprinciples">Our Design Principles</h2>
<ol>
<li><h2 id="asdasd">Design needs to add value, for all customers</strong></li>
</ol>
<p><em>Design decisions should delight all customers by always being functional, useable and reliable.</em></p>
<ol start="2">
<li><h2 id="qweqweqwe">Design makes the complex, simple</strong></li>
</ol>
<p><em>We do the heavy lifting for the user, providing trustful advice that allows them to operate fast and focus on growing their business.</em></p>
<ol start="3">
<li><h3 id="rererer">Data driven from empathy</strong></li>
</ol>
<p><em>We are driven by empathy for the user, and use data to validate that we are solving their most relevant issues first.</em></p>
<ol start="4">
<li><h2 id="uuuuuu">Done, tested, validated. Perfection is incremental</strong></li>
</ol>
<p><em>Getting small steps done and validated with users is the way to a more useful, reliable and delightful app. Testing is the fastest way to a delightful customer experience.</em></p>
<ol start="5">
<li><h4 id="ggggg">Design is a collaborative work</strong></li>
</ol>
<p><em>Getting input and quick feedback while designing gives more value to our work and allows us to iterate faster.</em></p>
`
test('it generally works', function(){
   expect(extractToc(mixed, 4)).toMatchSnapshot();
});
