import React, {useState} from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Button,
    useColorScheme,
    View,
  } from 'react-native';

  const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

  function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
  }

  async function graphQLFetch(query, variables = {}) {
    try {
        /****** Q4: Start Coding here. State the correct IP/port******/
        const response = await fetch('http://192.168.10.122:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
        /****** Q4: Code Ends here******/
      });
      const body = await response.text();
      const result = JSON.parse(body, jsonDateReviver);
  
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code == 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
          alert(`${error.message}:\n ${details}`);
        } else {
          alert(`${error.extensions.code}: ${error.message}`);
        }
      }
      return result.data;
    } catch (e) {
      alert(`Error in sending data to server: ${e.message}`);
    }
  }

  class IssueFilter extends React.Component {
    render() {
      return (
        <View>
        {/* ***** Q1: Start Coding here. ***** Create IssueFilter dummy component */}
          <Text style={styles.filterLabel}>Filter Issues:</Text>
          <TextInput
            style={styles.filterInput}
            placeholder="Enter filter criteria (e.g., Owner or Status)"
          />
          <Button title="Apply Filter" onPress={() => alert('Filter applied!')} />
        {/****** Q1: Code ends here ******/}
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16,
    paddingTop: 30, 
    backgroundColor: '#fff' 
  },
  header: { 
    height: 50, 
    backgroundColor: '#537791' 
  },
  text: { 
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  dataWrapper: { 
    marginTop: -1 
  },
  row: { 
    height: 40, 
    backgroundColor: '#E7E6E1' 
  },
  filterContainer: {
      padding: 10,
      backgroundColor: '#f9f9f9',
      marginBottom: 15,
      borderRadius: 5,
  },
  filterLabel: {
      fontSize: 16,
      marginBottom: 5,
  },
  filterInput: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 8,
      marginBottom: 10,
      borderRadius: 5,
  },
  addContainer: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
    borderRadius: 5,
  },
  addLabel: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  addInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  blacklistContainer: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
    borderRadius: 5,
  },
  blacklistLabel: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  blacklistInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
});

const width= [40,80,80,80,80,80,200];

function IssueRow(props) {
    const issue = props.issue;
    {/****** Q2: Coding Starts here. Create a row of data in a variable******/}
    const rowData = [
      issue.id,
      issue.title,
      issue.status,
      issue.owner,
      issue.created.toISOString().slice(0, 10), // ensure date is in the format YYYY-MM-DD
      issue.effort,
      issue.due ? issue.due.toISOString().slice(0, 10) : 'N/A', // handle null due date
    ];
    {/****** Q2: Coding Ends here.******/}
    return (
      <>
      {/****** Q2: Start Coding here. Add Logic to render a row  ******/}
        <Row 
          data={rowData} 
          style={styles.row} 
          textStyle={styles.text} 
          widthArr={width} 
        />
      {/****** Q2: Coding Ends here. ******/}  
      </>
    );
  }
  
  
  function IssueTable(props) {
    const issueRows = props.issues.map(issue =>
      <IssueRow key={issue.id} issue={issue} />
    );

    {/****** Q2: Start Coding here. Add Logic to initalize table header  ******/}
    const tableHead = ['ID', 'Title', 'Status', 'Owner', 'Created', 'Effort', 'Due Date'];
    {/****** Q2: Coding Ends here. ******/}
    
    
    return (
    <View style={styles.container}>
    {/****** Q2: Start Coding here to render the table header/rows.**********/}

      {/* Render the table header */}
      <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
        <Row data={tableHead} style={styles.header} textStyle={styles.text} />
      </Table>

      {/* Render the table rows */}
      <ScrollView style={styles.dataWrapper}>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
          {issueRows}
        </Table>
      </ScrollView>

    {/****** Q2: Coding Ends here. ******/}
    </View>
    );
  }

  
  class IssueAdd extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
      /****** Q3: Start Coding here. Create State to hold inputs******/
      this.state = {
        owner: '',
        title: '',
        status: 'New',
        effort: '',
        due: '',
      };
    
      this.handleOwnerChange = this.handleOwnerChange.bind(this);
      this.handleTitleChange = this.handleTitleChange.bind(this);
      this.handleEffortChange = this.handleEffortChange.bind(this);
      this.handleDueChange = this.handleDueChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      /****** Q3: Code Ends here. ******/
    }
  
    /****** Q3: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    handleOwnerChange(value) {
      this.setState({ owner: value });
    }
  
    handleTitleChange(value) {
      this.setState({ title: value });
    }
  
    handleEffortChange(value) {
      this.setState({ effort: value });
    }
  
    handleDueChange(value) {
      this.setState({ due: value });
    }
    /****** Q3: Code Ends here. ******/
    
    handleSubmit() {
      /****** Q3: Start Coding here. Create an issue from state variables and call createIssue. Also, clear input field in front-end******/
      const { owner, title, status, effort, due } = this.state;

      // alert if required fields are empty
      if (!owner || !title || !effort) {
        alert('Please fill in all required fields!');
        return;
      }
  
      // alert if effort is not a number
      if (isNaN(effort)) {
        alert('Effort must be a valid number!');
        return;
      }

      // alert if due date is not in the correct format
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
      if (due && !dateRegex.test(due)) {
        alert('Due Date must be in the format YYYY-MM-DD!');
        return;
      }

      const newIssue = {
        owner,
        title,
        status, // default to 'New'
        effort: parseInt(effort, 10),
        due: due ? new Date(due) : null, // set to null if empty
        created: new Date(), // automatically set to current date
      };
  
      // call from parent component
      this.props.createIssue(newIssue);
  
      // clear input fields
      this.setState({
        owner: '',
        title: '',
        status: 'New',
        effort: '',
        due: '',
      });
      /****** Q3: Code Ends here. ******/
    }

    render() {
      return (
        <View style={styles.addContainer}>
        {/****** Q3: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
          <Text style={styles.addLabel}>Add a New Issue</Text>

          {/* input fields */}
          <TextInput
            style={styles.addInput}
            placeholder="Owner"
            value={this.state.owner}
            onChangeText={this.handleOwnerChange}
          />
          <TextInput
            style={styles.addInput}
            placeholder="Title"
            value={this.state.title}
            onChangeText={this.handleTitleChange}
          />
          <TextInput
            style={styles.addInput}
            placeholder="Effort"
            value={this.state.effort}
            onChangeText={this.handleEffortChange}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.addInput}
            placeholder="Due Date (YYYY-MM-DD)"
            value={this.state.due}
            onChangeText={this.handleDueChange}
          />

          {/* submit button */}
          <Button title="Add Issue" onPress={this.handleSubmit} />
          {/****** Q3: Code Ends here. ******/}
        </View>
      );
    }
  }

class BlackList extends React.Component {
    constructor() {   
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
        /****** Q4: Start Coding here. Create State to hold inputs******/
      this.state = {
        owner: '',
      };
      this.handleOwnerChange = this.handleOwnerChange.bind(this);
        /****** Q4: Code Ends here. ******/
    }
    /****** Q4: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    handleOwnerChange(value) {
      this.setState({ owner: value });
    }
    /****** Q4: Code Ends here. ******/

    async handleSubmit() {
    /****** Q4: Start Coding here. Create an issue from state variables and issue a query. Also, clear input field in front-end******/
      const { owner } = this.state;

      // verify owner is not empty
      if (!owner) {
        alert('Please enter an owner to blacklist!');
        return;
      }

      const query = `
        mutation addtoBlacklist($owner: String!) {
          addtoBlacklist(owner: $owner) {
            owner
          }
        }
      `;

      // call the mutation 
      try {
        const result = await graphQLFetch(query, { owner });
        if (result && result.addToBlacklist) {
          alert(`Success! "${owner}" has been added to the blacklist.`);
        } else {
          alert(`Failed to add "${owner}" to blacklist. Please try again.`);
        }
      } catch (error) {
        alert(`Failed to add "${owner}" to blacklist: ${error.message}`);
      }

      // clear input field
      this.setState({ owner: '' });
    /****** Q4: Code Ends here. ******/
    }

    render() {
    return (
        <View>
        {/****** Q4: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
        <Text style={styles.blacklistLabel}>Add Owner to Blacklist</Text>

        {/* input field */}
        <TextInput
          style={styles.blacklistInput}
          placeholder="Owner name"
          value={this.state.owner}
          onChangeText={this.handleOwnerChange}
        />

        {/* submit button */}
        <Button title="Add to Blacklist" onPress={this.handleSubmit} />
        {/****** Q4: Code Ends here. ******/}
        </View>
    );
    }
}

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
    }
    
    componentDidMount() {
    this.loadData();
    }

    async loadData() {
    const query = `query {
        issueList {
        id title status owner
        created effort due
        }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
        this.setState({ issues: data.issueList });
    }
    }

    async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
        issueAdd(issue: $issue) {
        id
        }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
        this.loadData();
    }
    }
    
    
    render() {
    return (
      <>
        {/****** Q1: Start Coding here. ******/}
        <View>
            <IssueFilter />
        </View>
        {/****** Q1: Code ends here ******/}

        {/****** Q2: Start Coding here. ******/}
        <View>
            <IssueTable issues={this.state.issues} />
        </View>
        {/****** Q2: Code ends here ******/}
        
        {/****** Q3: Start Coding here. ******/}
        <View>
            <IssueAdd createIssue={this.createIssue} />
        </View>
        {/****** Q3: Code Ends here. ******/}

        {/****** Q4: Start Coding here. ******/}
        <View>
            <BlackList />
        </View>
        {/****** Q4: Code Ends here. ******/}
      </>
      
    );
  }
}
