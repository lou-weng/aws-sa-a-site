import * as React from 'react'

const HomeComponent = () => {
    return (
        <>
            <h1>Welcome to my personal AWS study site!</h1>
            <h2>AWS Solutions Architect Associate Certification</h2>
            <hr></hr>
            <h2>Exam Information</h2>
            <ul>
                <li>Cost: $150 USD or $190 CAD</li>
                <li>Time: 135 min</li>
                <li>Length: 65 Multiple Choice Questions</li>
            </ul>

            <h2>Important Links</h2>
            <a class="amazonButton"
                href="https://aws.amazon.com/certification/certified-solutions-architect-associate/">
                Certification Exam Page</a>
            <br /><br />
            <a class="amazonButton"
                href="https://d1.awsstatic.com/training-and-certification/docs-sa-assoc/AWS-Certified-Solutions-Architect-Associate_Exam-Guide.pdf">
                Exam Syllabus</a>

            <h2>Proposed Study Plan</h2>
            <ol>
                <li>Learn theory/knowledge behind AWS services</li>
                <li>Each each topic, try using AWS and familiarizing yourself with the console</li>
                <li>Complete practice tests</li>
            </ol>

            <h2>Useful Resources</h2>
            <h3>Free</h3>
            <h4>Learning</h4>
            <h4>Practice Labs</h4>
            <h4>Practice Tests</h4>
            <h3>Paid</h3>
            <h4>Learning</h4>
            <a class="amazonButton"
                href="https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c02/">
                Stephane Marek's Solution's Architect course</a>
            <h4>Practice Labs</h4>
            <h4>Practice Tests</h4>
        </>
    )
}

export default HomeComponent