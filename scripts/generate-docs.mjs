import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docs = path.join(root, 'docs');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'course-manifest.json'), 'utf8'));

const implemented = {
  '01': {
    purpose: 'Establish the ownership model for AI-assisted engineering: generated output is a proposal, not a transferred responsibility.',
    time: '35–45 minutes',
    objectives: [
      'Distinguish generation speed from engineering confidence.',
      'Name the consequences an engineer owns after accepting an AI-generated artifact.',
      'Apply a repeatable accept, revise, or reject decision to unfamiliar output.',
      'Compare ownership expectations for application code and infrastructure code.'
    ],
    concepts: [
      ['Generation is not completion', 'AI can produce plausible C#, SQL, YAML, or Terraform quickly. Completion begins when an engineer can explain the artifact, its assumptions, its failure modes, and the evidence that supports using it.'],
      ['Ownership follows acceptance', 'The meaningful boundary is not who typed the artifact. Once it enters your change, you own its behavior, security, cost, maintainability, rollback path, and documentation.'],
      ['Application and infrastructure code share consequences', 'A faulty method can corrupt data. A faulty infrastructure declaration can expose data, remove resilience, or create recurring cost. Different syntax does not reduce the need for engineering discipline.'],
      ['A practical decision loop', 'Clarify intent, inspect the artifact, identify assumptions and risk, gather evidence, then accept, revise, or reject. Record the reasoning needed by the next engineer.']
    ],
    exercise: 'Choose one small application artifact and one infrastructure artifact produced with AI. For each, write the intended outcome, three assumptions, two failure modes, the evidence required before acceptance, and an accept/revise/reject decision. Do not improve the artifacts yet; practice making ownership visible.',
    evidence: ['Two completed artifact review records', 'A decision for each artifact', 'A one-paragraph comparison of their consequences'],
    checklist: ['I can explain both artifacts without relying on the AI conversation.', 'I identified operational consequences, not only syntax concerns.', 'My decision cites evidence still needed.', 'I treated infrastructure code as production code.'],
    reflection: ['What made an artifact feel trustworthy before evidence existed?', 'Which consequence would be easiest to overlook?', 'What would you need to tell a reviewer before asking for approval?']
  },
  '02': {
    purpose: 'Build a deliberate review habit that starts with intent and risk before inspecting implementation detail.',
    time: '45–55 minutes',
    objectives: ['Review AI output in risk-first passes.', 'Separate correctness, maintainability, security, cost, and operability concerns.', 'Identify unsupported assumptions and suspicious omissions.', 'Write review findings that are specific and actionable.'],
    concepts: [
      ['Review intent before syntax', 'First restate what the change must accomplish and what it must not change. Correct-looking code can still solve the wrong problem.'],
      ['Review in passes', 'Use focused passes for boundaries, behavior, failure paths, security, cost, maintainability, and operations. A checklist supports judgment; it does not replace it.'],
      ['Look for omissions', 'AI output often appears complete while leaving out cancellation, timeouts, authorization, migrations, rollback, resource limits, or error handling. Missing behavior can carry more risk than visible defects.'],
      ['Make findings testable', 'A useful finding names the location, consequence, triggering condition, and a proportionate next action. “This seems wrong” is not enough for another engineer to verify.']
    ],
    exercise: 'Review a short AI-generated change in two passes. Pass one may inspect only the requirement and public behavior. Pass two inspects the implementation. Produce at least one finding in three different risk categories, then rank findings by consequence rather than style preference.',
    evidence: ['Restated acceptance criteria', 'Pass-by-pass review notes', 'At least three actionable findings', 'A consequence-based priority order'],
    checklist: ['Each finding describes a real consequence.', 'I separated evidence from suspicion.', 'I checked what the artifact omitted.', 'I avoided spending high-severity attention on style.'],
    reflection: ['What did the intent-first pass reveal?', 'Which omission was hardest to notice?', 'Where did personal preference try to masquerade as correctness?']
  },
  '03': {
    purpose: 'Turn plausible output into evidence-backed output by choosing validation methods that match the artifact and its risk.',
    time: '45–60 minutes',
    objectives: ['Distinguish review from validation.', 'Build a validation ladder from cheap checks to realistic evidence.', 'Match validation to C#, Python, UI, SQL, and infrastructure artifacts.', 'Stop when evidence is proportionate—not merely when a tool reports success.'],
    concepts: [
      ['Review asks; validation demonstrates', 'Review identifies questions and risks. Validation gathers evidence through parsing, builds, tests, static analysis, dry runs, plans, deployments to safe environments, and observation.'],
      ['Use a validation ladder', 'Start with fast deterministic checks, then move toward integration and production-like evidence as consequence increases. Passing a lower rung does not imply a higher rung will pass.'],
      ['Validate the artifact in context', 'A Terraform plan can be syntactically valid and still replace a database. A unit test can pass while the UI remains inaccessible. Evidence must address the actual consequence.'],
      ['Record limits', 'Every validation result has a boundary: environment, data, permissions, configuration, and time. State what was not demonstrated so confidence is not overstated.']
    ],
    exercise: 'Design validation ladders for one application change and one infrastructure change. Include the command or observation at each rung, the risk it addresses, the expected result, and the stop/escalation condition. Execute only safe checks available in your environment and record their limits.',
    evidence: ['Two validation ladders', 'Results from safe executable checks', 'Explicit unvalidated risks', 'A go, revise, or escalate recommendation'],
    checklist: ['Evidence maps to stated risks.', 'I did not treat compilation as behavioral proof.', 'I included a safe infrastructure preview or equivalent.', 'I recorded environment and data limitations.'],
    reflection: ['Which validation rung changed your confidence most?', 'What important behavior remains unproven?', 'When would you require another engineer or environment?']
  }
};

const future = {
  '04': ['Protect AI-assisted work with small commits, readable diffs, branches, and recoverable history.', ['Change isolation', 'Commit quality', 'Diff review', 'Revert versus rollback'], ['Decompose an AI-sized change into reviewable commits', 'Practice reverting a controlled change']],
  '05': ['Design tests around behavior and risk in application code.', ['Test boundaries', 'Unit and integration evidence', 'Failure paths', 'Regression tests'], ['Write a risk-based test plan', 'Add a regression test for an AI-introduced defect']],
  '06': ['Apply testing discipline to declarative infrastructure.', ['Linting and validation', 'Plans and what-if', 'Policy checks', 'Ephemeral environments'], ['Review a plan for destructive change', 'Design an infrastructure validation pipeline']],
  '07': ['Improve generated code without silently changing behavior.', ['Characterization tests', 'Small transformations', 'Readability', 'Technical debt'], ['Characterize then refactor an AI-generated function']],
  '08': ['Design changes that can be safely reversed.', ['Rollback constraints', 'Forward fixes', 'Database compatibility', 'Deployment strategies'], ['Write rollback criteria for app and infrastructure changes']],
  '09': ['Use architecture to constrain generation before artifacts multiply.', ['Quality attributes', 'Decision records', 'Dependency direction', 'Tradeoffs'], ['Draft an ADR before requesting implementation']],
  '10': ['Protect boundaries when AI creates code across components.', ['Contracts', 'APIs', 'Schemas', 'Compatibility'], ['Review a generated contract change for downstream impact']],
  '11': ['Treat documentation as maintained operational knowledge.', ['Audience and purpose', 'Runbooks', 'ADRs', 'Documentation drift'], ['Validate a generated runbook against the system']],
  '12': ['Assess whether a change will remain understandable and changeable.', ['Cohesion', 'Coupling', 'Naming', 'Complexity'], ['Conduct a maintainability review with evidence']],
  '13': ['Compare the engineering properties of application and infrastructure code.', ['Declarative versus imperative', 'State', 'Idempotence', 'Blast radius'], ['Trace consequences through matching app and IaC changes']],
  '14': ['Review generated Bicep and Terraform beyond syntax.', ['Resource identity', 'State and drift', 'Destructive plans', 'Module boundaries'], ['Annotate a plan or what-if result']],
  '15': ['Expose behavior hidden inside YAML and pipeline composition.', ['Triggers', 'Permissions', 'Secrets', 'Supply chain'], ['Threat-model a generated CI/CD pipeline']],
  '16': ['Review container and orchestration artifacts for production behavior.', ['Image construction', 'Runtime identity', 'Resources', 'Health and rollout'], ['Review a Dockerfile and Kubernetes manifest as one system']],
  '17': ['Perform security review as part of normal engineering ownership.', ['Threat modeling', 'Authorization', 'Secrets', 'Dependencies'], ['Produce a focused threat model and remediation plan']],
  '18': ['Recognize cost as a design and operational constraint.', ['Cost drivers', 'Scaling', 'Retention', 'FinOps feedback'], ['Estimate and challenge cost assumptions in generated infrastructure']],
  '19': ['Require enough telemetry and operating knowledge to own a change.', ['Logs, metrics, traces', 'SLIs and alerts', 'Runbooks', 'Failure diagnosis'], ['Design observability for an AI-generated feature']],
  '20': ['Combine engineering evidence into a production decision.', ['Readiness criteria', 'Risk acceptance', 'Release strategy', 'Rollback authority'], ['Run a structured production readiness review']],
  '21': ['Apply one ownership model across multiple application ecosystems.', ['Language idioms', 'Framework conventions', 'Tooling', 'Cross-stack review'], ['Compare equivalent generated changes across two stacks']],
  '22': ['Treat SQL and data evolution as high-consequence engineering.', ['Migrations', 'Transactions', 'Performance', 'Recovery'], ['Review a generated schema and migration sequence']],
  '23': ['Know when judgment requires escalation or collaboration.', ['Uncertainty', 'Expert review', 'Decision ownership', 'Communication'], ['Write an escalation brief for an ambiguous change']],
  '24': ['Demonstrate end-to-end ownership of a multi-artifact AI-assisted change.', ['Architecture', 'Implementation', 'Infrastructure', 'Validation and operations'], ['Deliver and defend a production-readiness evidence packet']]
};

const nav = (depth, active) => {
  const p = '../'.repeat(depth);
  return `<nav><div class="container"><a href="${p}index.html" class="brand">⚙ Engineering with AI</a>${[['Syllabus','syllabus/index.html'],['Sessions','sessions/index.html'],['Status','status/index.html'],['Architecture','architecture/index.html']].map(([label,href]) => `<a href="${p}${href}"${active===label?' class="active"':''}>${label}</a>`).join('')}</div></nav>`;
};

const head = (title, depth) => { const p='../'.repeat(depth); return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Professional Software Engineering in the Age of AI"><title>${title} — Engineering with AI</title><link rel="icon" href="${p}favicon.svg"><link rel="stylesheet" href="${p}styles.css"><link rel="stylesheet" href="${p}notes-widget.css"><link rel="stylesheet" href="${p}bookmark-widget.css"></head>`; };
const draft = '<div class="draft-watermark" aria-hidden="true">DRAFT</div>';
const badge = '<span class="badge badge-draft">🚧 DRAFT 🚧</span>';
const footer = '<footer><div class="container">Engineering with AI · AI can generate artifacts. Engineers own the consequences.</div></footer>';
const shell = (title, depth, active, body, scripts='') => `${head(title,depth)}<body>${draft}${nav(depth,active)}<main><div class="container">${body}</div></main>${footer}${scripts}</body></html>`;
const esc = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const list = values => `<ul>${values.map(x=>`<li>${x}</li>`).join('')}</ul>`;
const titleBlock = (eyebrow,title,subtitle) => `<div class="title-row"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1></div>${badge}</div><p class="subtitle">${subtitle}</p>`;

function sessionPage(session) {
  const lesson = implemented[session.id];
  const commonTop = `${titleBlock(`${session.layer} · Session ${session.id}`,session.title,lesson?.purpose ?? future[session.id][0])}<div class="alert ${lesson?'alert-info':'alert-warning'}">${lesson ? `Estimated time: ${lesson.time} · Initial implementation; validation is still pending.` : 'Intentionally scaffolded. This is an authoring plan, not a finished lesson.'}</div>`;
  let body;
  if (lesson) {
    body = `${commonTop}<h2>1. Learning Objectives</h2>${list(lesson.objectives)}<h2>2. Before You Begin</h2><div class="card"><p>Write a one-sentence answer before continuing:</p><p><strong>If AI produced a change that passed a quick check, what would you still need to own?</strong></p></div><h2>3. The Concept</h2>${lesson.concepts.map(([t,c],i)=>`<h3>${i+1}. ${t}</h3><p>${c}</p>`).join('')}<div class="alert alert-warning"><strong>Working rule:</strong> AI output is a candidate artifact. Confidence comes from engineering evidence, not fluency or speed.</div><h2>4. Lab</h2><div class="card"><div class="card-title">Exercise</div><p>${lesson.exercise}</p></div><h2>5. Expected Evidence</h2>${list(lesson.evidence)}<h2>6. Progress Checkpoint</h2><label class="progress-check"><input type="checkbox" data-progress-session="${session.id}"> Mark this session complete on this device</label><h2>7. Code Review Checklist</h2>${lesson.checklist.map(x=>`<label class="checklist-item"><input type="checkbox"> <span>${x}</span></label>`).join('')}<h2>8. Reflection Questions</h2>${list(lesson.reflection)}<h2>9. What Engineering Concept Was Learned Today?</h2><p>The engineer—not the generator—must connect intent, artifact, consequence, and evidence.</p>`;
  } else {
    const [purpose, concepts, exercises] = future[session.id];
    body = `${commonTop}<h2>Purpose</h2><p>${purpose}</p><h2>Learning Objectives</h2>${list([`Explain the role of ${concepts[0].toLowerCase()} in AI-assisted engineering.`,`Review generated artifacts using the session’s planned risk lens.`,`Produce evidence that supports an engineering decision.`])}<h2>Planned Concepts</h2>${list(concepts)}<h2>Expected Exercises</h2>${list(exercises)}<h2>Notes to the Future Author</h2><div class="card scaffold-notes"><p>Keep the lesson artifact-driven. Include both an application-code example and, where meaningful, an infrastructure or delivery example. Require the learner to inspect real output, state consequences, gather evidence, and record a decision.</p><p>Do not promote this session beyond <strong>Scaffolded</strong> until the lesson, exercise inputs, expected evidence, review checklist, and reflection have been written. Do not mark it Validated until the author has executed every technical step.</p></div>`;
  }
  const prev = Number(session.id)>1 ? `<a class="button button-secondary" href="../session-${String(Number(session.id)-1).padStart(2,'0')}/index.html">← Previous</a>` : '<span></span>';
  const next = Number(session.id)<manifest.sessions.length ? `<a class="button" href="../session-${String(Number(session.id)+1).padStart(2,'0')}/index.html">Next →</a>` : '<a class="button" href="../../status/index.html">Course status →</a>';
  body += `<div class="session-nav">${prev}${next}</div>`;
  return shell(session.title,2,'Sessions',body,`<script src="../../progress.js"></script><script src="../../notes-widget.js"></script><script src="../../bookmark-widget.js"></script>`);
}

const grouped = Object.groupBy(manifest.sessions, s=>s.layer);
const sessionRows = sessions => sessions.map(s=>`<tr><td><a href="../sessions/session-${s.id}/index.html">${s.id}</a></td><td><a href="../sessions/session-${s.id}/index.html">${s.title}</a></td><td><span class="badge ${s.status==='Implemented'?'badge-current':'badge-locked'}">${s.status}</span></td></tr>`).join('');
const syllabusBody = `${titleBlock('Course map','Syllabus','A staged path from AI-generated artifact to professionally owned system.')}<div class="alert alert-warning">Only Sessions 1–3 have initial lesson implementations. All other sessions are intentionally incomplete authoring scaffolds.</div>${Object.entries(grouped).map(([layer,sessions])=>`<h2>${layer}</h2><div class="table-wrap"><table><thead><tr><th>#</th><th>Session</th><th>Status</th></tr></thead><tbody>${sessionRows(sessions)}</tbody></table></div>`).join('')}`;

const home = shell('Home',0,'',`${titleBlock('Documentation-first course','Engineering with AI','Professional Software Engineering in the Age of AI')}<div class="principle"><span>AI can generate artifacts.</span><strong>Engineers own the consequences.</strong></div><div class="alert alert-warning"><strong>🚧 This entire course is a draft.</strong> Sessions 1–3 are initial implementations; later sessions are intentional scaffolds.</div><h2>What this course teaches</h2><p>This course teaches professional software engineering while using AI as a development partner. It is not anti-AI, a prompt-engineering course, or a collection of tricks. It develops the habits required to review, validate, test, refactor, document, secure, operate, and maintain generated artifacts.</p><div class="grid grid-3"><div class="card"><div class="card-title">Application code</div><p>C#, Python, React, Angular, and SQL require intent, tests, architecture, and maintainable change.</p></div><div class="card"><div class="card-title">Infrastructure code</div><p>Bicep, Terraform, YAML, Dockerfiles, and Kubernetes manifests carry blast radius, cost, security, and rollback consequences.</p></div><div class="card"><div class="card-title">Engineering evidence</div><p>Reviews, tests, plans, documentation, observability, and production-readiness decisions turn plausible output into owned work.</p></div></div><h2>Start here</h2><div class="grid grid-2"><a class="card link-card" href="syllabus/index.html"><div class="card-title">Explore the syllabus →</div><p>See all six curriculum layers and their current maturity.</p></a><a class="card link-card" href="sessions/session-01/index.html"><div class="card-title">Begin Session 1 →</div><p>Establish the ownership model for every artifact that follows.</p></a></div>`);

const sessionsIndex = shell('Sessions',1,'Sessions',`${titleBlock('Course workspace','Sessions','Implemented lessons and intentional plans for future authoring.')}<div class="progress-summary" data-progress-summary></div>${Object.entries(grouped).map(([layer,sessions])=>`<h2>${layer}</h2><div class="grid grid-2">${sessions.map(s=>`<a class="card link-card" href="session-${s.id}/index.html"><div class="session-card-top"><span class="badge badge-layer">Session ${s.id}</span><span class="badge ${s.status==='Implemented'?'badge-current':'badge-locked'}">${s.status}</span></div><div class="card-title">${s.title}</div><p>${implemented[s.id]?.purpose ?? future[s.id][0]}</p></a>`).join('')}</div>`).join('')}`,`<script src="../progress.js"></script>`);

const counts = Object.fromEntries(manifest.statusDefinitions.map(x=>[x,manifest.sessions.filter(s=>s.status===x).length]));
const statusBody = `${titleBlock('Source control','Course Status','Lifecycle status is explicit so a scaffold can never be mistaken for validated curriculum.')}<div class="alert alert-warning">The site-wide DRAFT marker remains until the course is explicitly released. Session status is narrower than publication status.</div><div class="table-wrap"><table><thead><tr><th>Status</th><th>Count</th><th>Definition</th></tr></thead><tbody>${[['Planned','Named and sequenced.'],['Scaffolded','Purpose and authoring plan exist; lesson is incomplete.'],['Drafted','A complete lesson draft exists.'],['Implemented','Learner-facing lesson and exercise exist.'],['Validated','Technical and instructional checks are complete.'],['Personally Completed','The author completed the lesson end to end.'],['Published','Explicitly released as course material.']].map(([s,d])=>`<tr><td>${s}</td><td>${counts[s]}</td><td>${d}</td></tr>`).join('')}</tbody></table></div><h2>Current session inventory</h2><div class="table-wrap"><table><thead><tr><th>#</th><th>Session</th><th>Lifecycle</th></tr></thead><tbody>${sessionRows(manifest.sessions)}</tbody></table></div>`;

const architectureBody = `${titleBlock('Maintainer guide','Architecture','A static, generated documentation system designed to remain understandable for years.')}<h2>Design lineage</h2><p>The visual system, navigation model, and instructional flow intentionally follow the React Learning Environment, with Session 19 as the main lesson-page reference. This is a sister course, not a new visual identity.</p><h2>Repository model</h2><div class="card"><pre><code>course-manifest.json       curriculum identity and lifecycle status
scripts/generate-docs.mjs  deterministic page generation
docs/                      GitHub Pages publication root
docs/sessions/             one stable URL per session
.github/workflows/         GitHub Pages deployment</code></pre></div><h2>Authoring contract</h2><p>Implemented sessions include objectives, concepts, a lab, expected evidence, a review checklist, and reflection. Scaffolded sessions contain only purpose, objectives, planned concepts, expected exercises, and notes to the future author.</p><h2>Progress and privacy</h2><p>Progress, notes, and bookmarks use browser local storage. There is no account, server, or analytics dependency. Clearing browser storage clears this local learning state.</p><h2>Maintenance rule</h2><div class="alert alert-info">Edit the manifest and generator, run the build, inspect the generated site, and advance status only when its evidence exists.</div>`;

function write(relative, content) { const file=path.join(docs,relative); fs.mkdirSync(path.dirname(file),{recursive:true}); fs.writeFileSync(file,content,'utf8'); }
write('index.html',home);
write('syllabus/index.html',shell('Syllabus',1,'Syllabus',syllabusBody));
write('sessions/index.html',sessionsIndex);
write('status/index.html',shell('Status',1,'Status',statusBody));
write('architecture/index.html',shell('Architecture',1,'Architecture',architectureBody));
for (const session of manifest.sessions) write(`sessions/session-${session.id}/index.html`,sessionPage(session));
write('404.html',shell('Not Found',0,'',`${titleBlock('404','Page not found','This course page does not exist or has moved.')}<p><a class="button" href="index.html">Return home</a></p>`));
console.log(`Generated ${manifest.sessions.length + 6} pages.`);
