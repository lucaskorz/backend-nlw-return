import  {SubmitFeedbackUseCase } from './submit-feedback-use-case'

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase( // mocando uma instância de SubMitFeedbackUseCase
  { create: createFeedbackSpy },  // verifica se a função create foi chamada
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {  //descrevendo o teste unitário
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.createFeedback({ // espero que ao criar um feedback
      type: 'BUG',                               // com essas propriedades
      comment: 'example comment',
      screenshot: 'data:image/png;base64',
    })).resolves.not.toThrow();                  // dê sucesso e não ocorra erro

    expect(createFeedbackSpy).toHaveBeenCalled(); // espero que a função create tenha sido chamada 
    expect(sendMailSpy).toHaveBeenCalled();       // espero que a função sendMail tenha sido chamada 
  })

  it('should not be able to submit without comment', async () => {
    await expect(submitFeedback.createFeedback({  // Espero que ao cadastrar um feedback
      type: 'BUG',
      comment: '',                                // sem informar o comment
      screenshot: 'data:image/png;base64',
    })).rejects.toThrow();                        // dê erro
  })

  it('should not be able to submit without type', async () => {
    await expect(submitFeedback.createFeedback({ // Espero que ao cadastrar um feedback
      type: '',                                  // sem informar o type
      comment: 'TEST',
      screenshot: 'data:image/png;base64',
    })).rejects.toThrow();                      // dê erro
  })

  it('should not be able to submit with an invalid screenshot', async () => {
    await expect(submitFeedback.createFeedback({ // Espero que ao cadastrar um feedback
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'test.png',                    // enviando uma screenshot inválida
    })).rejects.toThrow();                       // dê erro
  })
})