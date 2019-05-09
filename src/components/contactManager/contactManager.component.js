import React, { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import Table from '../Common/table';
import ContactForm from '../ContactDetail/addContact.component';
import TaskList from '../contactManager/contactList.manager';

function ContactManager(props) {
        return (
            <Fragment>
                <Row>
                    <Col>
                        <ContactForm />
                    </Col>
                </Row>

                <hr />

                <Row>
                    <Col>
                    <TaskList/>
                    </Col>
                </Row>
            </Fragment >
        );

}

export default ContactManager;