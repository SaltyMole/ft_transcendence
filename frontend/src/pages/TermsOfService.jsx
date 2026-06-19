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
			<p> Transcendance is a multiplayer web application that allows you to play online in real time, with social features: chat, profiles, and game history.<br/>
				By accessing or using the platform, you agree to these terms of use.</p>
			<h2  className="text-4xl font-bold" >2. Access to the Service</h2>
			<p> Access to Transcendance may require authentication via the Google API. <br/>
				You are responsible for maintaining the confidentiality of your account and all activity conducted under it.<br/>
				<br/>
				Some features may require:<br/>
				• two-factor authentication (2FA);<br/>
				• a secure connection (HTTPS).</p>
			<h2  className="text-4xl font-bold" >3. Data and Privacy</h2>
			<p>The platform may collect, among other things:<br/>
				• profile information; <br/>
				• game history;<br/>
				• social interactions (chat).<br/>
				<br/>
				This data is used to:<br/>
				• operate and provide the service;<br/>
				• improve the user experience.<br/>
				• Security measures may be implemented (encryption, secret management, depending on the infrastructure deployed).<br/>
				<br/>
				For details on data processing, please consult the privacy policy.</p>
			<h2  className="text-4xl font-bold" >4. Intellectual Property</h2>
			<p> The code, design, and visual elements of the platform are the property of their respective authors, unless otherwise stated.<br/>
				Users retain ownership of their content but grant the platform a limited license to use it only as necessary for the service to function.</p>
			<h2  className="text-4xl font-bold" >5. Service Availability</h2>
			<p>The service is provided "as is," without any guarantee of continuous availability. <br/>
				Interruptions may occur (maintenance, technical incidents).</p>
			<h2  className="text-4xl font-bold" >6. Changes to the Terms</h2>
			<p>These terms may be updated at any time.<br/>
				Users will be notified of significant changes whenever possible.</p>
			<h2  className="text-4xl font-bold" >7. Contact</h2>
			<p> For any questions regarding these terms, you can contact the project developers or maintainers.</p>
			<h2  className="text-4xl font-bold" >8. Acceptance</h2>
			<p> By using Transcendance, you acknowledge that you have read and accepted these terms of use.</p>
		</div>
	</main>
	)
}

export default TermsOfService;