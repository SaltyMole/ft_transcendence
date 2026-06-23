import BackButton from "../components/BackButton";

function PrivatePolicy()
{
	return (
	<main className='main2 bg-[#4D007E]' >
		<div className="w-full md:ml-100 md:mr-100 mb-5 " >
			<h1 className="text-6xl text-center font-bold m-10 "> Private Policy </h1>
			<BackButton/>
			
			<p className="text-right"> Last updated: [06/19/2026]</p>
			<h2 className="text-4xl font-bold" > 1. Introduction</h2>
			<p>Transcendance is a web application developed as part of the curriculum at École 42.<br/> This privacy policy explains how we collect, use, and protect your personal data when you use the application.</p>
			<h2 className="text-4xl font-bold">2. Data Collected</h2>
			<p className= "font-bold pt-5">Account<br/><br/></p>
			<p> • Username<br/>
				• Email address (via OAuth provider)<br/>
				• Profile information (avatar, preferences)<br/><br/>
			<p className= "font-bold pt-5">Authentification<br/><br/></p>
			• OAuth tokens<br/>
			• Two-factor authentication data (if enabled)<br/><br/>
			<p className= "font-bold pt-5">Usage data<br/><br/></p>
			(to be completed)<br/><br/>
			<p className= "font-bold pt-5">Communications<br/><br/></p>
			• Messages sent via chat <br/><br/>
			<h2 className="text-4xl font-bold" >3. Use of Data</h2>
			• Provide and maintain the service<br/>
			• Enable real-time multiplayer<br/>
			• Manage authentication and security<br/>
			• Maintain game history and statistics<br/>
			• Improve the user experience<br/><br/>
			<h2 className="text-4xl font-bold" >4. Data Sharing</h2>
			We do not sell your personal data or share it for commercial purposes with third parties.<br/>
			Data may only be shared with:<br/><br/>

			• Authentication providers (Google API)<br/>
			• Infrastructure services strictly necessary for the application to function<br/><br/>
			<h2 className="text-4xl font-bold" >5. Storage and Security </h2>
			We implement security measures, including:<br/>
			(to be completed)<br/>
			Despite these measures, no system is completely invulnerable.<br/><br/>
			
			<h2 className="text-4xl font-bold" >6. Data Retention </h2>
			Data is retained only for as long as necessary for the application to function.<br/>
			You can request the deletion of your data.<br/>

			<h2 className="text-4xl font-bold" >7. Your Rights </h2>
			In accordance with applicable regulations (including the GDPR), you have the following rights:<br/><br/>

			• Access your personal data <br/>
			• Request rectification or erasure<br/>
			• Objection to processing <br/><br/>

			To exercise these rights, contact the project maintainers. <br/>
			
			<h2 className="text-4xl font-bold" >8. Third-Party Services</h2>
			The application relies in particular on:<br/><br/>
			•Google API (OAuth authentication) <br/><br/>	
			We are not responsible for the privacy practices of third parties.

			<h2 className="text-4xl font-bold" >9. Changes to this Policy</h2>
			This privacy policy may be updated at any time.<br/>
			Users will be notified of significant changes.

			<h2 className="text-4xl font-bold" >10. Contact</h2>
			For any questions regarding this privacy policy, please contact the project team.

			</p>
			</div>

	</main>
	)
}

export default PrivatePolicy;