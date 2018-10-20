import React, { Component } from "react";

import { Button, SelectMenu } from "evergreen-ui";

export class CollegeSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            selectedNames: "0 selected..."
        };
        this.onDeselect = this.onDeselect.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    onDeselect(collegeName) {
        let selectedColleges = this.state.selected;
        let deslectedIndex = selectedColleges.indexOf(collegeName);
        selectedColleges.splice(deslectedIndex, 1);
        const selectedCollegeNames = this.updateText(selectedColleges);

        this.setState({
            selected: selectedColleges,
            selectedNames: selectedCollegeNames
        });
    }

    onSelect(collegeName) {
        const selectedColleges = [...this.state.selected, collegeName];
        const selectedCollegeNames = this.updateText(selectedColleges);

        this.setState({
            selected: selectedColleges,
            selectedNames: selectedCollegeNames
        });
    }

    updateText(selectedColleges) {
        let text = "";
        const numColleges = selectedColleges.length;

        if (numColleges === 1) {
            text = selectedColleges.toString();
        } else if (numColleges > 1) {
            text = numColleges.toString() + " colleges selected...";
        }

        return text;
    }

    render() {
        return (
            <SelectMenu
                hasFilter={false}
                isMultiSelect={true}
                title="Select college calendar(s) to view"
                options={
                    ["Benjamin Franklin", "Berkeley", "Branford", "Davenport", "Ezra Stiles", "Grace Hopper", "Johnathan Edwards", "Morse","Pauli Murray", "Pierson", "Saybrook", "Silliman", "Timothy Dwight", "Trumbull"].map(label => ({ label, value: label }))
                }
                selected={this.state.selected}
                onSelect={item => this.onSelect(item.value)}
                onDeselect={item => this.onDeselect(item.value)}
            >
                <Button>{this.state.selectedNames || "Select college..."}</Button>
            </SelectMenu>
        );
    }
}