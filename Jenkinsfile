import tools.*
import com.foodit.jenkins.pipeline.stages.CommonStages
import com.foodit.jenkins.pipeline.stages.CommonSteps
import com.foodit.jenkins.workflow.BuildEnvironment

// Need to initialize global workflow for this context
Workflow.init(this)

def pipeline = com.foodit.jenkins.pipeline.PipelineFactory.create(this)

// Note Checkout needs to happen first
pipeline.add(CommonStages.Checkout)

pipeline.add('Dependencies', {
    Yarn.install()
})

pipeline.add(CommonStages.DeployAEJob)

cdNode('kube-builder') {
    pipeline.execute()
}


