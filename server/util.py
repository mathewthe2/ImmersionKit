from aqt import mw

class AnkiHelper():
    def __init__(self):
        pass

    def get_deck_names(self):
        deck_names = [l['name'] for l in mw.col.decks.all()]
        return deck_names

    def get_model_names(self):
        model_names = [l['name'] for l in mw.col.models.all()]
        return model_names

    def get_model_field_names(self, model_name):
        model = next(model for model in mw.col.models.all() if model['name'] == model_name)
        field_names = mw.col.models.field_names(model)
        return field_names


        

# def get_deck_names():
#     deck_names = ', '.join([l['name'] for l in mw.col.decks.all()])
#     return deck_names

# def get_field_names():
#     models = mw.col.models
#     ret = fieldNames = models.fieldNames(model)