import { Component, OnInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AgentsService } from 'src/app/services/agents.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css'],
})
export class AgentsComponent implements OnInit, OnChanges {
  allAgents;

  constructor(private agent: AgentsService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.agent.getAllAgents().subscribe((agents: Object) => {
      this.allAgents = agents;
    });
  }

  ngOnChanges(): void {
    this.agent.getAllAgents().subscribe((agents) => {
      this.allAgents = agents;
    });
  }

  handleCreateAgent(f: NgForm) {
    const { name, location, truckType } = f.form.value;

    this.agent.createAgent(name, location, truckType).subscribe({
      next: (res) => {
        this.toastr.info(res['msg']);
        this.ngOnChanges();
      },
      error: (error) => {
        this.toastr.error(error.error['err']);
      },
    });

    f.resetForm();
  }
}
