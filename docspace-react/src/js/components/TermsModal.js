import React from "react";
import { Modal, Button } from "react-bootstrap";

class TermsModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: this.props.show,
    };
    this.showTerms = this.showTerms.bind(this);
    this.hideTerms = this.hideTerms.bind(this);
  }

  showTerms() {
    this.setState({
      show: true,
    });
  }

  hideTerms() {
    this.setState({
      show: false,
    });
  }

  render() {
    return (
      <Modal
        show={this.state.show}
        onHide={this.hideTerms}
        backdrop="static"
        size="lg"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Terms and Conditions</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            These legally binding Terms and Conditions (the “Terms”) constitute
            an agreement enforceable by law (the “Agreement”) between you and
            COGENCE HEALTH, a sole proprietorship organised and incorporated
            under the laws of India with its registered office at "PRASAM”,
            Royal Park-2, Kalawad Road, Rajkot, Gujarat-360005, India
            (“Cogence”, “we”, “us” and/or “our”) governing your access to and
            use of the Cogence website, including any subdomains thereof, and
            any other websites through which Cogence makes its services
            available (collectively, “Site”), our mobile, tablet and other smart
            device applications, and application program interfaces
            (collectively, “Application”) and all associated services
            (collectively, “Cogence Services”). The Site, Application and
            Cogence Services together are hereinafter collectively referred to
            as the “Cogence Platform”. 1. Cogence Services 1.1 The Cogence
            Platform is a webspace that enables registered users (“Members”) and
            certain third parties who offer services to publish or live stream
            content on the Cogence Platform (“Listings”). 2. Usage of Cogence
            Platform 2.1 In order to access and use the Cogence Platform or
            register a Cogence Account you must be an individual of at least 18
            years old and able to enter into legally binding contracts. 3.
            Account Registration 3.1 You may be required to register an account
            (“Cogence Account”) to access and use certain features of the
            Cogence Platform. If you are unable to register, Cogence shall
            create the same for you. 3.2 You can register a Cogence Account
            using an email address and creating a password, or through your
            account with certain third-party social networking services, such as
            Facebook or Google. 3.3 You must provide accurate, current and
            complete information during the registration process and keep your
            Cogence Account up-to-date at all times. 3.4 You may not register
            more than one (1) Cogence Account unless Cogence authorizes you to
            do so. You may not assign or otherwise transfer your Cogence Account
            to another party. 3.5 You are responsible for maintaining the
            confidentiality and security of your Cogence Account credentials and
            may not disclose your credentials to any third party. 4. Content 4.1
            Cogence may, at its sole discretion, enable Members to (i) create,
            upload, post, send, receive and store content, such as text, photos,
            audio, video, or other materials and information on or through the
            Cogence Platform (“Member Content”); and (ii) access and view Member
            Content and any content that Cogence itself makes available on or
            through the Cogence Platform, including proprietary Cogence content
            and any content licensed or authorized for use by or through Cogence
            from a third party (“Cogence Content” and together with Member
            Content, “Collective Content”). 4.2 The Cogence Platform, Cogence
            Content, and Member Content may in its entirety or in part be
            protected by copyright, trademark, and/or other laws. You
            acknowledge and agree that the Cogence Platform and Cogence Content,
            including all associated intellectual property rights, are the
            property of Cogence and/or its licensors or authorizing
            third-parties. You will not remove, alter or obscure any copyright,
            trademark, service mark or other proprietary rights notices
            incorporated in or accompanying the Cogence Platform, Cogence
            Content or Member Content. All trademarks, service marks, logos,
            trade names, and any other source identifiers of Cogence used on or
            in connection with the Cogence Platform and Cogence Content are
            trademarks or registered trademarks of Cogence in the United States
            and abroad. Trademarks, service marks, logos, trade names and any
            other proprietary designations of third parties used on or in
            connection with the Cogence Platform, Cogence Content, and/or
            Collective Content are used for identification purposes only and may
            be the property of their respective owners. 4.3 You will not use,
            copy, adapt, modify, prepare derivative works of, distribute,
            license, sell, transfer, publicly display, publicly perform,
            transmit, broadcast or otherwise exploit the Cogence Platform or
            Collective Content, except to the extent you are the legal owner of
            certain Member Content or as expressly permitted in these Terms. No
            licenses or rights are granted to you by implication or otherwise
            under any intellectual property rights owned or controlled by
            Cogence or its licensors, except for the licenses and rights
            expressly granted in these Terms. 4.4 Subject to your compliance
            with these Terms, Cogence grants you a limited, non-exclusive,
            non-sublicensable, revocable, non-transferable license to (i)
            download and use the Application on your personal device(s); and
            (ii) access and view any Collective Content made available on or
            through the Cogence Platform and accessible to you, solely for your
            personal and non-commercial use. 4.5 By creating, uploading,
            posting, sending, receiving, storing, or otherwise making available
            any Member Content on or through the Cogence Platform, you grant to
            Cogence a non-exclusive, worldwide, royalty-free, irrevocable,
            perpetual (or for the term of the protection), sub-licensable and
            transferable license to such Member Content to access, use, store,
            copy, modify, prepare derivative works of, distribute, publish,
            transmit, stream, broadcast, and otherwise exploit in any manner
            such Member Content to provide and/or promote the Cogence Platform,
            in any media or platform. 4.6 You are solely responsible for all
            Member Content that you make available on or through the Cogence
            Platform. Accordingly, you represent and warrant that: (i) you
            either are the sole and exclusive owner of all Member Content that
            you make available on or through the Cogence Platform or you have
            all rights, licenses, consents and releases that are necessary to
            grant to Cogence the rights in and to such Member Content, as
            contemplated under these Terms; and (ii) neither the Member Content
            nor your posting, uploading, publication, submission or transmittal
            of the Member Content or Cogence’s use of the Member Content (or any
            portion thereof) as contemplated under these Terms will infringe,
            misappropriate or violate a third party’s patent, copyright,
            trademark, trade secret, moral rights or other proprietary or
            intellectual property rights, or rights of publicity or privacy, or
            result in the violation of any applicable law or regulation. 4.7 You
            will not post, upload, publish, submit or transmit any Member
            Content that: (i) is fraudulent, false, misleading (directly or by
            omission or failure to update information) or deceptive; (ii) is
            defamatory, libelous, obscene, pornographic, vulgar or offensive;
            (iii) promotes discrimination, bigotry, racism, hatred, harassment
            or harm against any individual or group; (iv) is violent or
            threatening or promotes violence or actions that are threatening to
            any other person or animal; (v) promotes illegal or harmful
            activities or substances; (vi) unlawful or not owned by you; or
            (vii) violates any Cogence policy. 5. Payments 5.1 There may be
            certain payments from Cogence to you and from you to Cogence in
            respect of the Cogence Platform. The fee shall be intimated to you
            in advance. Once agreed, the fee shall be non-refundable and
            transactions shall be non-cancellable. 5.2 The fee shall be subject
            to applicable GST and applicable TDS. 5.3 Cogence reserves the right
            to change the fee at any time, and will provide Members adequate
            notice of any fee changes before they become effective. Such fee
            changes will not affect any bookings made prior to the effective
            date of the fee change. 6. Prohibited Activities 6.1 You are solely
            responsible for compliance with any and all laws, rules,
            regulations, and tax obligations that may apply to your use of the
            Cogence Platform. In connection with your use of the Cogence
            Platform, you will not and will not assist or enable others to:
            breach or circumvent any applicable laws or regulations, agreements
            with third-parties, third-party rights, or our Terms; use the
            Cogence Platform or Collective Content for any commercial or other
            purposes that are not expressly permitted by these Terms or in a
            manner that falsely implies Cogence endorsement, partnership or
            otherwise misleads others as to your affiliation with Cogence; copy,
            store or otherwise access or use any information, including
            personally identifiable information about any other Member,
            contained on the Cogence Platform in any way that is inconsistent
            with Cogence’s policies or these Terms or that otherwise violates
            the privacy rights of Members or third parties; use the Cogence
            Platform in connection with the distribution of unsolicited
            commercial messages (“spam”); request, accept or make any payment
            outside of the Cogence Platform. If you do so, you acknowledge and
            agree that you: (i) would be in breach of these Terms; (ii) accept
            all risks and responsibility for such payment, and (iii) hold
            Cogence harmless from any liability for such payment; discriminate
            against or harass anyone on the basis of race, national origin,
            religion, gender, gender identity, physical or mental disability,
            medical condition, marital status, age or sexual orientation, or
            otherwise engage in any violent, harmful, abusive or disruptive
            behavior; misuse or abuse any Listings or services associated with
            the Cogence Platform. use, display, mirror or frame the Cogence
            Platform or Collective Content, or any individual element within the
            Cogence Platform, Cogence’s name, any Cogence trademark, logo or
            other proprietary information, or the layout and design of any page
            or form contained on a page in the Cogence Platform, without
            Cogence’s express written consent; dilute, tarnish or otherwise harm
            the Cogence brand in any way, including through unauthorized use of
            Collective Content, registering and/or using Cogence or derivative
            terms in domain names, trade names, trademarks or other source
            identifiers, or registering and/or using domains names, trade names,
            trademarks or other source identifiers that closely imitate or are
            confusingly similar to Cogence domains, trademarks, taglines,
            promotional campaigns or Collective Content; use any robots, spider,
            crawler, scraper or other automated means or processes to access,
            collect data or other content from or otherwise interact with the
            Cogence Platform for any purpose; avoid, bypass, remove, deactivate,
            impair, descramble, or otherwise attempt to circumvent any
            technological measure implemented by Cogence or any of Cogence’s
            providers or any other third party to protect the Cogence Platform;
            attempt to decipher, decompile, disassemble or reverse engineer any
            of the software used to provide the Cogence Platform; take any
            action that damages or adversely affects, or could damage or
            adversely affect the performance or proper functioning of the
            Cogence Platform; or, violate or infringe anyone else’s rights or
            otherwise cause harm to anyone. 6.2 If you feel that any Member you
            interact with, whether online or in person, is acting or has acted
            inappropriately, including but not limited to anyone who (i) engages
            in offensive, violent or sexually inappropriate behavior, (ii) you
            suspect of stealing from you, or (iii) engages in any other
            disturbing conduct, you should immediately report such person to the
            appropriate authorities and then to Cogence by contacting us with
            your police station and report number (if available). You agree that
            any report you make will not obligate us to take any action (beyond
            that required by law, if any). 7. Term and Termination 7.1 You may
            terminate this Agreement at any time by sending us an email. 7.2
            Without limiting our rights specified below, Cogence may terminate
            this Agreement for convenience at any time by giving you a notice
            via email to your registered email address. 7.3 Cogence may
            immediately, without notice, terminate this Agreement and/or stop
            providing access to the Cogence Platform if (i) you have materially
            breached your obligations under these Terms, (ii) you have violated
            applicable laws, regulations or third party rights, or (iii) Cogence
            believes in good faith that such action is reasonably necessary to
            protect the personal safety or property of Cogence, its Members, or
            third parties (for example in the case of fraudulent behavior of a
            Member). 7.4 In addition, Cogence may take any of the following
            measures (i) to comply with applicable law, or the order or request
            of a court, law enforcement or other administrative agency or
            governmental body, or if (ii) you have breached these Terms,
            applicable laws, regulations, or third party rights, (iii) you have
            provided inaccurate, fraudulent, outdated or incomplete information
            during the Cogence Account registration, Listing process or
            thereafter, or (iv) Cogence believes in good faith that such action
            is reasonably necessary to protect the personal safety or property
            of Cogence, its Members, or third parties, or to prevent fraud or
            other illegal activity: refuse to surface, delete or delay any
            Listings, or other Member Content; limit your access to or use of
            the Cogence Platform; temporarily or permanently revoke any special
            status associated with your Cogence Account; temporarily or in case
            of severe or repeated offenses permanently suspend your Cogence
            Account and stop providing access to the Cogence Platform. In case
            of non-material breaches and where appropriate, you will be given
            notice of any intended measure by Cogence and an opportunity to
            resolve the issue to Cogence’s reasonable satisfaction. 7.5 If we
            take any of the measures described, you will not be entitled to any
            compensation for pending or confirmed bookings that were cancelled.
            7.6 When this Agreement has been terminated, you are not entitled to
            a restoration of your Cogence Account or any of your Member Content.
            If your access to or use of the Cogence Platform has been limited or
            your Cogence Account has been suspended or this Agreement has been
            terminated by us, you may not register a new Cogence Account or
            access and use the Cogence Platform through a Cogence Account of
            another Member. 8. Disclaimer If we choose to conduct identity
            verification or background checks on any Member, to the extent
            permitted by applicable law, we disclaim warranties of any kind,
            either express or implied, that such checks will identify prior
            misconduct by a Member or guarantee that a Member will not engage in
            misconduct in the future. 9. Liability You acknowledge and agree
            that, to the maximum extent permitted by law, the entire risk
            arising out of your access to and use of the Cogence Platform and
            Collective Content, your publishing or usage of any Listing via the
            Cogence Platform, or any other interaction you have with other
            Members whether in person or online remains with you. Neither
            Cogence nor any other party involved in creating, producing, or
            delivering the Cogence Platform or Collective Content will be liable
            for any incidental, special, exemplary or consequential damages,
            including lost profits, loss of data or loss of goodwill, service
            interruption, computer damage or system failure or the cost of
            substitute products or services, or for any damages for personal or
            bodily injury or emotional distress arising out of or in connection
            with (i) these Terms, (ii) from the use of or inability to use the
            Cogence Platform or Collective Content, (iii) from any
            communications, interactions or meetings with other Members or other
            persons with whom you communicate, interact or meet with as a result
            of your use of the Cogence Platform, or (iv) from your publishing or
            usage of a Listing, whether based on warranty, contract, tort
            (including negligence), product liability or any other legal theory,
            and whether or not Cogence has been informed of the possibility of
            such damage, even if a limited remedy set forth herein is found to
            have failed of its essential purpose. In no event will Cogence’s
            aggregate liability arising out of or in connection with these Terms
            and your use of the Cogence Platform including, but not limited to,
            from your publishing or usage of any Listings via the Cogence
            Platform, or from the use of or inability to use the Cogence
            Platform or Collective Content or interactions with any other
            Members, exceed the lowest of the (i) amounts you have paid or owe
            for Listings via the Cogence Platform in the two months’ period
            prior to the event giving rise to the liability, or (ii) the amounts
            paid by Cogence to you in the two months’ period prior to the event
            giving rise to the liability, or (iii) INR 2500. The limitations of
            damages set forth above are fundamental elements of the basis of the
            bargain between Cogence and you. 10. Indemnification To the maximum
            extent permitted by applicable law, you agree to release, defend (at
            Cogence’s option), indemnify, and hold Cogence and its affiliates
            and subsidiaries, their officers, directors, employees and agents,
            harmless from and against any claims, liabilities, damages, losses,
            and expenses, including, without limitation, reasonable legal and
            accounting fees, arising out of or in any way connected with (i)
            your breach of these Terms or our policies or standards, (ii) your
            improper use of the Cogence Platform or any Cogence Services, (iii)
            your interaction with any Member, including without limitation any
            injuries, losses or damages (whether compensatory, direct,
            incidental, consequential or otherwise) of any kind arising in
            connection with or as a result of such interaction, stay,
            participation or use, or (iv) your breach of any laws, regulations
            or third party rights. 11. Applicable Law and Jurisdiction 15.1
            These Terms will be interpreted in accordance with the laws of
            India. You and we both consent to the exclusive jurisdiction of
            courts at Rajkot, India. 12. General Provisions 12.1 Except as they
            may be supplemented by additional terms and conditions, policies,
            guidelines or standards, these Terms constitute the entire Agreement
            between Cogence and you pertaining to the subject matter hereof, and
            supersede any and all prior oral or written understandings or
            agreements between Cogence and you in relation to the access to and
            use of the Cogence Platform. 12.2 No joint venture, partnership,
            employment, or agency relationship exists between you and Cogence as
            a result of this Agreement or your use of the Cogence Platform. 12.3
            These Terms do not and are not intended to confer any rights or
            remedies upon any person other than the parties. 12.4 If any
            provision of these Terms is held to be invalid or unenforceable,
            such provision will be struck and will not affect the validity and
            enforceability of the remaining provisions. 12.5 Cogence’s failure
            to enforce any right or provision in these Terms will not constitute
            a waiver of such right or provision unless acknowledged and agreed
            to by us in writing. Except as expressly set forth in these Terms,
            the exercise by either party of any of its remedies under these
            Terms will be without prejudice to its other remedies under these
            Terms or otherwise permitted under law. 12.6 You may not assign,
            transfer or delegate this Agreement and your rights and obligations
            hereunder without Cogence’s prior written consent. Cogence may
            without restriction assign, transfer or delegate this Agreement and
            any rights and obligations hereunder, at its sole discretion. 12.7
            Unless specified otherwise, any notices or other communications to
            Members permitted or required under this Agreement, will be provided
            electronically and given by Cogence via email, Cogence Platform
            notification, or messaging service (including SMS and WhatsApp).
            12.8 Cogence reserves the right to modify these Terms at any time in
            accordance with this provision. If we make changes to these Terms,
            we will post the revised Terms on the Cogence Platform. We will also
            provide you with notice of the modifications by email before the
            date they become effective. If you disagree with the revised Terms,
            you may terminate this Agreement with immediate effect. We will
            inform you about your right to terminate the Agreement in the
            notification email. If you do not terminate your Agreement before
            the date the revised Terms become effective, your continued access
            to or use of the Airbnb Platform will constitute acceptance of the
            revised Terms.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.hideTerms}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default TermsModal;
