import BackButton from "../components/BackButton";
function TermsOfService()
{
	return(
	<main className='main2 bg-[#4D007E]' >
		<div className="w-full md:ml-100 md:mr-100 mb-10 ">
			<h1 className="text-6xl font-bold m-10 text-center"> Terms Of Service </h1>
			<BackButton/>
			<p className="text-right"> Last updated: [06/19/2026]</p>
			<h2  className="text-4xl font-bold" >1. Service Description</h2>
			<p> Transcendance is a multiplayer web application that allows you to play online in real time, with social features: chat, profiles.<br/>
				By accessing or using the platform, you agree to these terms of use.</p>
			<h2  className="text-4xl font-bold" >2. Access to the Service</h2>
			<p> Access to Transcendance may require authentication via the Google API. <br/>
				You are responsible for maintaining the confidentiality of your account and all activity conducted under it.<br/>
				<br/>
				Some features may require:<br/>
				• two-factor authentication (2FA);<br/>
				• a secure connection (HTTPS).</p>
			<h2  className="text-4xl font-bold" >3. Data and Privacy</h2>
			<p>In the course of its operation, the platform may collect and process certain data, including:<br/>
				• profile information; <br/>
				• win history;<br/>
				• drawing history;<br/>
				• social interactions, such as messages exchanged via chat..<br/>
				<br/>
				This data is used to:<br/>
				• operate and provide the service;<br/>
				• improve the user experience.<br/>
				ensure the security and proper functioning of the platform.<br/>
				<br/>
				For more information regarding the processing of personal data, please consult the service's privacy policy.</p>
			<h2  className="text-4xl font-bold" >4. Intellectual Property</h2>
			<p> The source code, design, graphic elements, and content integrated into the platform remain the property of their respective authors, unless otherwise indicated.<br/>
			
			Users retain ownership of the content they publish on the platform. However, they grant Transcendance limited authorization to use such content solely to the extent necessary for the operation of the service.</p>

			<h2 className="text-4xl font-bold">5. Service Availability</h2>
			<p>	Temporary interruptions may occur, particularly due to maintenance, updates, or technical issues.<br/></p>
			
			<h2  className="text-4xl font-bold" >6. Rules of Use</h2>
			<p>Users agree to use the platform respectfully towards other players and not to:<br/><br/>

				disrupt the operation of the service;<br/>
				attempt unauthorized access to the platform's data or systems;<br/>
				use automated means or software designed to gain an unfair advantage during games;<br/>
				publish content that is illegal, abusive, or contrary to applicable laws.<br/><br/>

				The developers reserve the right to suspend or terminate account access in the event of non-compliance with these rules.</p>
			<h2  className="text-4xl font-bold" >7. Modification of Terms</h2>
			<p>These terms of use may be modified at any time to reflect project developments or technical and regulatory changes.<br/>
				Where possible, users will be notified of significant changes.</p>
			<h2  className="text-4xl font-bold" >8. Contact</h2>
			<p> For any questions regarding these terms of use, you may contact the project developers or maintainers.<br/></p>
			<h2  className="text-4xl font-bold" >9. Acceptance of Terms</h2>
			<p> By using the Transcendance platform, you acknowledge that you have read these terms of use and agree to comply with them.<br/></p>
		</div>
	</main>
	)
}

export default TermsOfService;